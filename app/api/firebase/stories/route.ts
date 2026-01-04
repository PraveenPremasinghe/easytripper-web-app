import { NextRequest, NextResponse } from "next/server";
import {
  getStories,
  createStory,
  updateStory,
  deleteStory,
} from "@/lib/firebase/db";
import { Story } from "@/lib/types";

export async function GET() {
  try {
    const stories = await getStories();
    return NextResponse.json({ success: true, data: stories });
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const story = await createStory(body as Omit<Story, "id">);
    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...storyData } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Story ID is required" },
        { status: 400 }
      );
    }
    const story = await updateStory(id, storyData);
    if (!story) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: story });
  } catch (error: any) {
    console.error("Error updating story:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Story ID is required" },
        { status: 400 }
      );
    }
    const deleted = await deleteStory(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting story:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

