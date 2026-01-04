import { NextRequest, NextResponse } from 'next/server';
import { getProvinces, createProvince } from '@/lib/db';
import { Province } from '@/lib/places';

export async function GET() {
  try {
    const provinces = await getProvinces();
    return NextResponse.json(provinces);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch provinces' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const province = await createProvince(body as Province);
    return NextResponse.json(province, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create province' },
      { status: 500 }
    );
  }
}

