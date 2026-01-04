import { NextRequest, NextResponse } from "next/server";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/firebase/db";

// GET - Fetch all testimonials
export async function GET() {
  try {
    const testimonials = await getTestimonials();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST - Create a new testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, country, comment, rating, avatar, tripRoute } = body;

    if (!name || !country || !comment || !rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build testimonial object, only including optional fields if they exist
    const testimonialData: any = {
      name,
      country,
      comment,
      rating: Number(rating),
    };
    
    if (avatar) {
      testimonialData.avatar = avatar;
    }
    if (tripRoute) {
      testimonialData.tripRoute = tripRoute;
    }
    
    const testimonial = await createTestimonial(testimonialData);

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

// PUT - Update a testimonial
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const testimonial = await updateTestimonial(id, updateData);
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a testimonial
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteTestimonial(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

