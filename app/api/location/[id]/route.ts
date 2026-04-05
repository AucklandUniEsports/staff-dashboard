import { NextRequest, NextResponse } from "next/server";
import { LocationService } from "../../../../services/LocationService";
import { checkAuth } from "@/utils/checkAuth";

export const GET = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid id" },
        { status: 400 }
      );
    }

    try {
      const location = await LocationService.getLocationById(id);

      if (!location) {
        return NextResponse.json(
          { message: "Location not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(location);
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
);

export const PUT = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    if (isNaN(id)) {
        return NextResponse.json(
            { message: "Invalid id" },
            { status: 400 }
        );
    }
    const data = await req.json();
    try {
        const updatedLocation = await LocationService.updateLocation(id, data);
        return NextResponse.json(
            { message: "Location updated successfully", data: updatedLocation },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});

export const DELETE = checkAuth(async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
        return NextResponse.json(
            { message: "Invalid id" },
            { status: 400 }
        );
    }

    try {
        await LocationService.deleteLocation(id);
        return NextResponse.json(
            { message: "Location deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});