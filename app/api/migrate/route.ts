import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { destinations, tours, vehicles, blogPosts, stories } from '@/lib/data';
import { provinces } from '@/lib/places';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function POST() {
  try {
    // Ensure data directory exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Migrate all data
    await fs.writeFile(
      path.join(DATA_DIR, 'destinations.json'),
      JSON.stringify(destinations, null, 2)
    );

    await fs.writeFile(
      path.join(DATA_DIR, 'tours.json'),
      JSON.stringify(tours, null, 2)
    );

    await fs.writeFile(
      path.join(DATA_DIR, 'vehicles.json'),
      JSON.stringify(vehicles, null, 2)
    );

    await fs.writeFile(
      path.join(DATA_DIR, 'blogPosts.json'),
      JSON.stringify(blogPosts, null, 2)
    );

    await fs.writeFile(
      path.join(DATA_DIR, 'stories.json'),
      JSON.stringify(stories, null, 2)
    );

    await fs.writeFile(
      path.join(DATA_DIR, 'provinces.json'),
      JSON.stringify(provinces, null, 2)
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Data migration completed successfully!',
      files: ['destinations.json', 'tours.json', 'vehicles.json', 'blogPosts.json', 'stories.json', 'provinces.json']
    });
  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to migrate data' },
      { status: 500 }
    );
  }
}

