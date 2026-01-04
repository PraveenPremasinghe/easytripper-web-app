import { NextRequest, NextResponse } from 'next/server';
import { addPlaceToProvince } from '@/lib/db';
import { Place } from '@/lib/places';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const province = await addPlaceToProvince(id, body as Place);
    if (!province) {
      return NextResponse.json(
        { error: 'Province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(province, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add place to province' },
      { status: 500 }
    );
  }
}

