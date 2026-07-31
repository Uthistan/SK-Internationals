import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { COUNTRY_LABELS } from "@/content/countries";
import { QUOTE_LABELS } from "@/content/quote";

// Mirrors the client schema in components/sections/RequestQuote.tsx. Duplicated
// deliberately: the browser copy is a convenience, this one is the boundary,
// and a request that skips the form must still be rejected here.
const quoteSchema = z.object({
  mode: z.string().min(1),
  movement: z.string().min(1),
  origin: z.string().min(1),
  destination: z.string().min(1),
  cargo: z.string().min(1),
  quantity: z.string().min(1),
  purpose: z.string().min(1),
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

/** Falls back to the raw value so an unknown option still reaches a human. */
const label = (map: Record<string, string>, value: string) =>
  map[value] ?? value;

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set, so the quote email cannot be sent.");
    return NextResponse.json({ error: "Failed to send request" }, { status: 502 });
  }

  const {
    mode,
    movement,
    origin,
    destination,
    cargo,
    quantity,
    purpose,
    name,
    email,
    phone,
    message,
  } = parsed.data;

  const lane = `${label(COUNTRY_LABELS, origin)} → ${label(COUNTRY_LABELS, destination)}`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "SK Internationals Website <onboarding@resend.dev>",
      to: "uthistan666@gmail.com",
      replyTo: email,
      // The lane is in the subject so a rate request is triageable from the
      // inbox list without opening it.
      subject: `Quote request: ${lane} (${label(QUOTE_LABELS, mode)})`,
      text: [
        "SHIPMENT",
        `Mode: ${label(QUOTE_LABELS, mode)}`,
        `Movement type: ${label(QUOTE_LABELS, movement)}`,
        `Lane: ${lane}`,
        `Cargo: ${label(QUOTE_LABELS, cargo)}`,
        `Approximate quantity: ${quantity}`,
        `Commercial or personal: ${label(QUOTE_LABELS, purpose)}`,
        "",
        "CONTACT",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "NOTES",
        message?.trim() || "None",
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send request" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to send quote email:", err);
    return NextResponse.json({ error: "Failed to send request" }, { status: 502 });
  }
}
