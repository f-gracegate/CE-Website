import { NextResponse } from 'next/server';
import { prayers } from '@/lib/prayers';

export const dynamic = 'force-dynamic';

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prayer = prayers.find((p) => p.id === id);
  if (!prayer) {
    return NextResponse.json({ error: 'Prayer not found' }, { status: 404 });
  }
  prayer.prayingCount += 1;
  return NextResponse.json(prayer);
}
