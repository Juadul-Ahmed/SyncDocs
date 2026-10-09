
import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:5000/api";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${API_URL}/documents/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("GET document proxy error:", error);

    return NextResponse.json(
      { message: "Failed to fetch document" },
      { status: 500 }
    );
  }
}