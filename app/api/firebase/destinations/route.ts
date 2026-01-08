import { NextRequest, NextResponse } from "next/server";
import {
  getDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} from "@/lib/firebase/db";
import { Destination } from "@/lib/types";

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json({ success: true, data: destinations });
  } catch (error: unknown) {
    console.error("Error fetching destinations:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    const destination = await createDestination(body as Destination);
    return NextResponse.json({ success: true, data: destination }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating destination:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, ...destinationData } = body;
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    const destination = await updateDestination(slug, destinationData);
    if (!destination) {
      return NextResponse.json(
        { success: false, error: "Destination not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: destination });
  } catch (error: unknown) {
    console.error("Error updating destination:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }
    const deleted = await deleteDestination(slug);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Destination not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting destination:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

