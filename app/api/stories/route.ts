import { NextRequest, NextResponse } from 'next/server';
import { getStories, createStory } from '@/lib/db';
import { Story } from '@/lib/types';

export async function GET() {
  try {
    const stories = await getStories();
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const story = await createStory(body as Story);
    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    );
  }
}

