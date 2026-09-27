import { NextResponse } from 'next/server';
import { fetchClaimById } from '@/lib/mockApi';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await fetchClaimById(id);
  if (!data) {
    return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}
