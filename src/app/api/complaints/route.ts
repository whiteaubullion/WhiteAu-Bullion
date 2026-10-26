import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const COMPLAINTS_FILE = path.join(process.cwd(), 'src', 'data', 'complaints.json');

export function getStoredComplaints() {
  try {
    if (fs.existsSync(COMPLAINTS_FILE)) {
      const data = fs.readFileSync(COMPLAINTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading complaints file:', error);
  }
  return [];
}

export function saveComplaints(complaints: any[]) {
  try {
    const dir = path.dirname(COMPLAINTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(COMPLAINTS_FILE, JSON.stringify(complaints, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving complaints file:', error);
    return false;
  }
}

export async function GET() {
  // Try Supabase first if available
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customer_complaints')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ complaints: data });
    }
  } catch {
    // Fallback to local json
  }

  const complaints = getStoredComplaints();
  return NextResponse.json({ complaints });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, category, branch, message } = body;

    const cleanName = (name || '').trim();
    const cleanPhone = (phone || '').replace(/\D/g, '');
    const cleanMessage = (message || '').trim();

    if (!cleanName || !cleanMessage) {
      return NextResponse.json(
        { error: 'Name and complaint message are required.' },
        { status: 400 }
      );
    }

    if (cleanPhone && cleanPhone.length !== 10) {
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
      category: category || 'Other',
      branch: (branch || '').trim() || 'General',
      message: cleanMessage,
      status: 'pending',
      created_at: now
    };

    // 1. Save to local JSON backend
    const current = getStoredComplaints();
    const updated = [newComplaint, ...current];
    saveComplaints(updated);

    // 2. Also try inserting into Supabase customer_complaints
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
    } catch {
      // Supabase table optional fallback
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
