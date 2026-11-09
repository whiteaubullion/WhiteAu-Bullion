import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { revalidatePath } from 'next/cache';

const SEED_FILE = path.join(process.cwd(), 'src', 'data', 'complaints.json');
const TMP_FILE = path.join(os.tmpdir(), 'whiteau_complaints.json');

declare global {
  // eslint-disable-next-line no-var
  var __whiteau_complaints_cache: any[] | undefined;
}

const DEFAULT_COMPLAINTS = [
  {
    id: "comp-1729904400000",
    name: "Kiran Kumar",
    phone: "9847123456",
    email: "kiran.k@example.com",
    category: "Valuation Dispute",
    branch: "Cherthala",
    message: "I visited the branch to sell an old gold chain. The initial purity readout was slightly lower than my previous hallmark certificate. Requested a second check.",
    status: "pending",
    created_at: "2026-10-25T14:20:00.000Z"
  }
];

export function getStoredComplaints(): any[] {
  // 1. In-memory cache
  if (global.__whiteau_complaints_cache && Array.isArray(global.__whiteau_complaints_cache) && global.__whiteau_complaints_cache.length > 0) {
    return global.__whiteau_complaints_cache;
  }

  // 2. /tmp storage (writable in serverless/Vercel)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        global.__whiteau_complaints_cache = parsed;
        return parsed;
      }
    }
  } catch {}

  // 3. Seed file
  try {
    if (fs.existsSync(SEED_FILE)) {
      const data = fs.readFileSync(SEED_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        global.__whiteau_complaints_cache = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading complaints file:', error);
  }

  global.__whiteau_complaints_cache = DEFAULT_COMPLAINTS;
  return DEFAULT_COMPLAINTS;
}

export function saveComplaints(complaints: any[]): boolean {
  global.__whiteau_complaints_cache = complaints;

  // 1. Write to /tmp (always writable in serverless/Vercel)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(complaints, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to tmp complaints:', e);
  }

  // 2. Try to write to project seed file (works in local dev, safe EROFS catch in production)
  try {
    const dir = path.dirname(SEED_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SEED_FILE, JSON.stringify(complaints, null, 2), 'utf-8');
  } catch {
    // Expected EROFS in serverless; memory and /tmp already saved
  }

  return true;
}

export async function GET() {
  let complaints: any[] = [];
  // Try Supabase first if available
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customer_complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      global.__whiteau_complaints_cache = data;
      complaints = data;
    } else {
      complaints = getStoredComplaints();
    }
  } catch {
    complaints = getStoredComplaints();
  }

  // Filter out any cookie-deleted complaints
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const deletedCookie = cookieStore.get('whiteau_deleted_complaints')?.value;
    if (deletedCookie) {
      const deletedIds = JSON.parse(deletedCookie);
      if (Array.isArray(deletedIds) && deletedIds.length > 0) {
        complaints = complaints.filter((c: any) => !deletedIds.includes(String(c.id)));
      }
    }
  } catch {}

  return NextResponse.json({ complaints });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, branch, message } = body;

    const cleanName = (name || '').trim();
    let cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.slice(1);
    }
    const cleanMessage = (message || '').trim();

    if (!cleanName || !cleanMessage) {
      return NextResponse.json(
        { error: 'Name and complaint message are required.' },
        { status: 400 }
      );
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newComplaint = {
      id: `comp-${Date.now()}`,
      name: cleanName,
      phone: cleanPhone,
      email: (email || '').trim().toLowerCase(),
      category: category || 'Valuation Dispute',
      branch: (branch || '').trim() || 'General',
      message: cleanMessage,
      status: 'pending',
      created_at: now
    };

    // 1. Save to local/tmp/memory storage first for 100% reliability
    const current = getStoredComplaints();
    const updated = [newComplaint, ...current.filter(c => c.id !== newComplaint.id)];
    saveComplaints(updated);

    // 2. Also insert into Supabase customer_complaints if table exists
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('customer_complaints').insert({
        id: newComplaint.id,
        name: newComplaint.name,
        phone: newComplaint.phone,
        email: newComplaint.email,
        category: newComplaint.category,
        branch: newComplaint.branch,
        message: newComplaint.message,
        status: newComplaint.status,
        created_at: newComplaint.created_at
      });
    } catch (e) {
      console.warn('Supabase customer_complaints insert skipped:', e);
    }

    try {
      revalidatePath('/admin/complaints');
      revalidatePath('/admin');
    } catch {}

    return NextResponse.json({
      success: true,
      complaint: newComplaint,
      complaints: updated
    });
  } catch (error) {
    console.error('Failed to submit complaint:', error);
    return NextResponse.json(
      { error: 'Failed to process complaint submission.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Complaint ID is required' }, { status: 400 });
    }

    const current = getStoredComplaints();
    const updated = current.filter((c: any) => String(c.id) !== String(id));
    saveComplaints(updated);

    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      await supabase.from('customer_complaints').delete().eq('id', id);
    } catch {}

    try {
      revalidatePath('/admin/complaints');
      revalidatePath('/admin');
    } catch {}

    return NextResponse.json({ success: true, complaints: updated });
  } catch (error) {
    console.error('Failed to delete complaint:', error);
    return NextResponse.json({ error: 'Failed to delete complaint' }, { status: 500 });
  }
}
