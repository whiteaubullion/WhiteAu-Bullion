import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const REVIEWS_FILE = path.join(process.cwd(), 'src', 'data', 'reviews.json');

const DEFAULT_REVIEWS = [
  {
    id: "rev-1",
    name: "Rahul M.",
    role: "Verified Customer",
    rating: 5,
    title: "Extremely transparent and professional!",
    text: "They tested my gold right in front of me and offered the live market rate.",
    date: "2 days ago"
  },
  {
    id: "rev-2",
    name: "Sneha K.",
    role: "Local Client",
    rating: 5,
    title: "The instant payment was a lifesaver.",
    text: "I was skeptical about selling my old jewellery, but the team made it secure and easy.",
    date: "4 days ago"
  },
  {
    id: "rev-3",
    name: "David T.",
    role: "Verified Customer",
    rating: 5,
    title: "Best valuation in Kerala.",
    text: "WhiteAu gave me the most honest and highest return for my pledged gold.",
    date: "1 week ago"
  },
  {
    id: "rev-4",
    name: "Anjali S.",
    role: "Local Client",
    rating: 4,
    title: "Very smooth experience.",
    text: "The staff explained the purity test clearly. Got money transferred in minutes.",
    date: "2 weeks ago"
  },
  {
    id: "rev-5",
    name: "Vikram P.",
    role: "Verified Customer",
    rating: 5,
    title: "Totally hassle-free!",
    text: "Releasing my pledged gold was a headache until I found them. They handled the bank directly.",
    date: "3 weeks ago"
  }
];

function getStoredReviews() {
  try {
    if (fs.existsSync(REVIEWS_FILE)) {
      const data = fs.readFileSync(REVIEWS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading reviews file:', error);
  }
  return DEFAULT_REVIEWS;
}

function saveReviews(reviews: any[]) {
  try {
    const dir = path.dirname(REVIEWS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving reviews file:', error);
    return false;
  }
}

export async function GET() {
  const reviews = getStoredReviews();
  return NextResponse.json({ reviews });
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
      rating: Number(rating) || 5,
      title: title?.trim() || 'Great Customer Experience',
      text: text.trim(),
      date: 'Just now'
    };

    const currentReviews = getStoredReviews();
    const updatedReviews = [newReview, ...currentReviews];
    saveReviews(updatedReviews);

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
