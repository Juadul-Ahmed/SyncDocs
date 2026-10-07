import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:5000/api";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/documents`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Backend request failed",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);

    return NextResponse.json(
      {
        message: "Failed to connect to backend",
      },
      {
        status: 500,
      }
    );
  }
}
