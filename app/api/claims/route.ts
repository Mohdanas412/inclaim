import { NextResponse } from 'next/server';
import { fetchClaims } from '@/lib/mockApi';

export async function GET() {
  const claims = await fetchClaims();
  return NextResponse.json(claims);
}
