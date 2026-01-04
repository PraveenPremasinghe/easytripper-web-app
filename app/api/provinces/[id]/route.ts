import { NextRequest, NextResponse } from 'next/server';
import { getProvince, updateProvince, deleteProvince } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const province = await getProvince(id);
    if (!province) {
      return NextResponse.json(
        { error: 'Province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(province);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch province' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const province = await updateProvince(id, body);
    if (!province) {
      return NextResponse.json(
        { error: 'Province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(province);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update province' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteProvince(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Province not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete province' },
      { status: 500 }
    );
  }
}

