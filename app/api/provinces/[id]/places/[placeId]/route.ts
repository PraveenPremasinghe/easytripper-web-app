import { NextRequest, NextResponse } from 'next/server';
import { updatePlaceInProvince, deletePlaceFromProvince } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; placeId: string }> }
) {
  try {
    const { id, placeId } = await params;
    const body = await request.json();
    const place = await updatePlaceInProvince(id, placeId, body);
    if (!place) {
      return NextResponse.json(
        { error: 'Place or province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(place);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update place' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; placeId: string }> }
) {
  try {
    const { id, placeId } = await params;
    const deleted = await deletePlaceFromProvince(id, placeId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Place or province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete place' },
      { status: 500 }
    );
  }
}

