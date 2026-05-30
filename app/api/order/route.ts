import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { service, link, quantity, price, serviceName, network, userId } = await req.json();

    const params = new URLSearchParams({
      key: process.env.JAP_API_KEY!,
      action: "add",
      service: String(service),
      link,
      quantity: String(quantity),
    });

    const response = await fetch("https://justanotherpanel.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    // Save order to Supabase
    await supabase.from("orders").insert({
      user_id: userId,
      service_name: serviceName,
      network,
      link,
      quantity,
      price,
      jap_order_id: String(data.order),
      status: "pending",
    });

    return NextResponse.json({ success: true, order: data.order });

  } catch (error) {
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}