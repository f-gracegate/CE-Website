import { NextResponse } from 'next/server';
import { CATEGORIES, prayers, type PrayerRequest } from '@/lib/prayers';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(prayers);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { author, request, category } = body ?? {};
  if (!author || !request || !category) {
    return NextResponse.json({ error: 'Missing required prayer fields.' }, { status: 400 });
  }
  const newPrayer: PrayerRequest = {
    id: `prayer-${Date.now()}`,
    author: String(author).trim().slice(0, 80),
    request: String(request).trim().slice(0, 1000),
    category: CATEGORIES.includes(category) ? category : 'Other',
    createdAt: 'Just now',
    prayingCount: 1,
  };
  prayers.unshift(newPrayer);
  return NextResponse.json(newPrayer, { status: 201 });
}
