import { NextRequest, NextResponse } from "next/server";

async function getCampayToken() {
  const res = await fetch("https://demo.campay.net/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: process.env.CAMPAY_USERNAME,
      password: process.env.CAMPAY_PASSWORD,
    }),
  });
  const data = await res.json();
  return data.token;
}

export async function POST(req: NextRequest) {
  try {
    const { amount, phone, currency = "XAF" } = await req.json();

    const token = await getCampayToken();

    const res = await fetch("https://demo.campay.net/api/collect/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({
        amount: String(amount),
        currency,
        from: phone,
        description: "Orbitek wallet top-up",
        external_reference: `orbitek_${Date.now()}`,
      }),
    });

    const data = await res.json();

    if (data.reference) {
      return NextResponse.json({ success: true, reference: data.reference });
    } else {
      return NextResponse.json({ error: data.message || "Payment failed" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Payment error" }, { status: 500 });
  }
}
