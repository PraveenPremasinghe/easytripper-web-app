import { NextRequest, NextResponse } from 'next/server';
import { getDestinations, createDestination } from '@/lib/db';
import { Destination } from '@/lib/types';

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const destination = await createDestination(body as Destination);
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create destination' },
      { status: 500 }
    );
  }
}

