
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


export async function PUT(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(
      `${API_URL}/documents/${encodeURIComponent(id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("PUT document proxy error:", error);

    return NextResponse.json(
      { message: "Failed to update document" },
      { status: 500 }
    );
  }
}

// DELETE a document
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `http://127.0.0.1:5000/api/documents/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        cache: "no-store",
      },
    );

    const data = await response.text();

    return new Response(data || null, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to delete document:", error);

    return Response.json(
      { message: "Failed to delete document" },
      { status: 500 },
    );
  }
}