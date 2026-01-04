import { NextRequest, NextResponse } from "next/server";
import {
  getTours,
  createTour,
  updateTour,
  deleteTour,
} from "@/lib/firebase/db";
import { Tour } from "@/lib/types";

export async function GET() {
  try {
    const tours = await getTours();
    return NextResponse.json({ success: true, data: tours });
  } catch (error: any) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const tour = await createTour(body as Omit<Tour, "id">);
    return NextResponse.json({ success: true, data: tour }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating tour:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...tourData } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Tour ID is required" },
        { status: 400 }
      );
    }
    const tour = await updateTour(id, tourData);
    if (!tour) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: tour });
  } catch (error: any) {
    console.error("Error updating tour:", error);
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
        { success: false, error: "Tour ID is required" },
        { status: 400 }
      );
    }
    const deleted = await deleteTour(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Tour not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting tour:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

