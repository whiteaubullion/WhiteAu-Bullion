import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { revalidatePath } from 'next/cache';

const SEED_FILE = path.join(process.cwd(), 'src', 'data', 'reviews.json');
const TMP_FILE = path.join(os.tmpdir(), 'whiteau_reviews.json');

// In-memory cache across requests in the current process/instance
declare global {
  // eslint-disable-next-line no-var
  var __whiteau_reviews_cache: any[] | undefined;
}

const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    name: "Rahul M.",
    role: "Verified Customer",
    rating: 5,
    title: "Extremely transparent and professional!",
    text: "They tested my gold right in front of me and offered the live market rate.",
    date: "2 days ago",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "rev-2",
    name: "Sneha K.",
    role: "Local Client",
    rating: 5,
    title: "The instant payment was a lifesaver.",
    text: "I was skeptical about selling my old jewellery, but the team made it secure and easy.",
    date: "4 days ago",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: "rev-3",
    name: "David T.",
    role: "Verified Customer",
    rating: 5,
    title: "Best valuation in Kerala.",
    text: "WhiteAu gave me the most honest and highest return for my pledged gold.",
    date: "1 week ago",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString()
  },
  {
    id: "rev-4",
    name: "Anjali S.",
    role: "Local Client",
    rating: 4,
    title: "Very smooth experience.",
    text: "The staff explained the purity test clearly. Got money transferred in minutes.",
    date: "2 weeks ago",
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: "rev-5",
    name: "Vikram P.",
    role: "Verified Customer",
    rating: 5,
    title: "Totally hassle-free!",
    text: "Releasing my pledged gold was a headache until I found them. They handled the bank directly.",
    date: "3 weeks ago",
    created_at: new Date(Date.now() - 21 * 86400000).toISOString()
  }
];

export function getStoredReviews(): any[] {
  // 1. Check in-memory cache
  if (global.__whiteau_reviews_cache && Array.isArray(global.__whiteau_reviews_cache) && global.__whiteau_reviews_cache.length > 0) {
    return global.__whiteau_reviews_cache;
  }

  // 2. Check /tmp file (writable in serverless)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        global.__whiteau_reviews_cache = parsed;
        return parsed;
      }
    }
  } catch (error) {
    // ignore tmp read errors
  }

  // 3. Fallback to bundled seed file
  try {
    if (fs.existsSync(SEED_FILE)) {
      const data = fs.readFileSync(SEED_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        global.__whiteau_reviews_cache = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading reviews file:', error);
  }

  global.__whiteau_reviews_cache = DEFAULT_REVIEWS;
  return DEFAULT_REVIEWS;
}

export function saveReviews(reviews: any[]): boolean {
  // Update memory
  global.__whiteau_reviews_cache = reviews;

  // 1. Save to /tmp (always writable in serverless/Vercel)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to tmp reviews file:', e);
  }

  // 2. Try to save to local seed file if filesystem is writable (local dev)
  try {
    const dir = path.dirname(SEED_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SEED_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
  } catch (error) {
    // EROFS is expected on serverless / read-only production environments.
    // Safe to ignore since memory and /tmp are updated, and Supabase is primary.
  }

  return true;
}

export async function GET() {
  let reviews: any[] = [];
  // Try fetching from Supabase if table exists
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customer_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      global.__whiteau_reviews_cache = data;
      reviews = data;
    } else {
      reviews = getStoredReviews();
    }
  } catch {
    reviews = getStoredReviews();
  }

  // Filter out any cookie-deleted reviews as fallback
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const deletedCookie = cookieStore.get('whiteau_deleted_reviews')?.value;
    if (deletedCookie) {
      const deletedIds = JSON.parse(deletedCookie);
      if (Array.isArray(deletedIds) && deletedIds.length > 0) {
        reviews = reviews.filter((r: any) => !deletedIds.includes(String(r.id)));
      }
    }
  } catch {}

  return NextResponse.json({ reviews, source: global.__whiteau_reviews_cache ? 'cached' : 'local' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, title, text, role } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: 'Name and review text are required' },
        { status: 400 }
      );
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role?.trim() || 'Verified Customer',
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      title: title?.trim() || 'Great Customer Experience',
      text: text.trim(),
      date: 'Just now',
      created_at: new Date().toISOString()
    };

    // 1. Save to local/tmp/memory storage first for immediate availability
    const currentReviews = getStoredReviews();
    const updatedReviews = [newReview, ...currentReviews.filter(r => r.id !== newReview.id)];
    saveReviews(updatedReviews);

    // 2. Also try inserting to Supabase if table exists
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('customer_reviews').insert({
        id: newReview.id,
        name: newReview.name,
        role: newReview.role,
        rating: newReview.rating,
        title: newReview.title,
        text: newReview.text,
        date: newReview.date,
        created_at: newReview.created_at
      });
    } catch (e) {
      console.warn('Supabase customer_reviews insert skipped:', e);
    }

    try {
      revalidatePath('/');
      revalidatePath('/admin/reviews');
    } catch {}

    return NextResponse.json({
      success: true,
      review: newReview,
      reviews: updatedReviews
    });
  } catch (error) {
    console.error('Failed to submit review:', error);
    return NextResponse.json(
      { error: 'Failed to process review' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    // 1. Delete from local/tmp/memory storage safely (never throws EROFS)
    const currentReviews = getStoredReviews();
    const updatedReviews = currentReviews.filter((r: any) => String(r.id) !== String(id));
    saveReviews(updatedReviews);

    // 2. Also delete from Supabase if table exists
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('customer_reviews').delete().eq('id', id);
    } catch {
      // Table might not exist yet
    }

    try {
      revalidatePath('/');
      revalidatePath('/admin/reviews');
    } catch {}

    return NextResponse.json({
      success: true,
      reviews: updatedReviews
    });
  } catch (error) {
    console.error('Failed to delete review:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
