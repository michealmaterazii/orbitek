import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://justanotherpanel.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        key: process.env.JAP_API_KEY!,
        action: "services",
      }).toString(),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
