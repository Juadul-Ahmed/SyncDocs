
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "http://127.0.0.1:5000/api/documents";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${BACKEND_URL}/${encodeURIComponent(id)}/favorite`,
      {
        method: "PATCH",
        cache: "no-store",
      },
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: "Failed to update favorite status" },
      { status: 500 },
    );
  }
}

