import { NextRequest, NextResponse } from 'next/server';
import { getTours, createTour } from '@/lib/db';
import { Tour } from '@/lib/types';

export async function GET() {
  try {
    const tours = await getTours();
    return NextResponse.json(tours);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tour = await createTour(body as Tour);
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    );
  }
}

