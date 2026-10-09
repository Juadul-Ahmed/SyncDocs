import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:5000/api";

// GET all documents
export async function GET() {
  try {
    const response = await fetch(`${API_URL}/documents`, {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("GET documents proxy error:", error);

    return NextResponse.json(
      { message: "Failed to connect to backend" },
      { status: 500 }
    );
  }
}

// CREATE a document
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("POST document proxy error:", error);

    return NextResponse.json(
      { message: "Failed to create document" },
      { status: 500 }
    );
  }
}