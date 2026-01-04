import { NextRequest, NextResponse } from "next/server";
import {
  getProvinces,
  createProvince,
  updateProvince,
  deleteProvince,
  addPlaceToProvince,
  updatePlaceInProvince,
  deletePlaceFromProvince,
} from "@/lib/firebase/db";
import { Province, Place } from "@/lib/places";

export async function GET() {
  try {
    const provinces = await getProvinces();
    return NextResponse.json({ success: true, data: provinces });
  } catch (error: any) {
    console.error("Error fetching provinces:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === "createProvince") {
      const province = await createProvince(data as Omit<Province, "id">);
      return NextResponse.json({ success: true, data: province }, { status: 201 });
    }

    if (action === "addPlace") {
      const { provinceId, place } = data;
      if (!provinceId || !place) {
        return NextResponse.json(
          { success: false, error: "Province ID and place are required" },
          { status: 400 }
        );
      }
      const province = await addPlaceToProvince(provinceId, place as Place);
      if (!province) {
        return NextResponse.json(
          { success: false, error: "Province not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: province }, { status: 201 });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === "updateProvince") {
      const { id, ...provinceData } = data;
      if (!id) {
        return NextResponse.json(
          { success: false, error: "Province ID is required" },
          { status: 400 }
        );
      }
      const province = await updateProvince(id, provinceData);
      if (!province) {
        return NextResponse.json(
          { success: false, error: "Province not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: province });
    }

    if (action === "updatePlace") {
      const { provinceId, placeId, place } = data;
      if (!provinceId || !placeId || !place) {
        return NextResponse.json(
          { success: false, error: "Province ID, place ID, and place data are required" },
          { status: 400 }
        );
      }
      const updatedPlace = await updatePlaceInProvince(provinceId, placeId, place);
      if (!updatedPlace) {
        return NextResponse.json(
          { success: false, error: "Place or province not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: updatedPlace });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in PUT:", error);
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
    const provinceId = searchParams.get("provinceId");
    const placeId = searchParams.get("placeId");
    const action = searchParams.get("action");

    if (action === "deletePlace" && provinceId && placeId) {
      const deleted = await deletePlaceFromProvince(provinceId, placeId);
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: "Place or province not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    }

    if (action === "deleteProvince" && id) {
      const deleted = await deleteProvince(id);
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: "Province not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid parameters" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

