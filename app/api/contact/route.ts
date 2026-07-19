import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  tradeLane: z.string().min(1),
  message: z.string().min(10),
});

const TRADE_LANE_LABELS: Record<string, string> = {
  gulf: "Persian & Arabian Gulf",
  "red-sea": "Red Sea",
  "indian-subcontinent": "Indian Sub-Continent",
};

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send enquiry email.");
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 502 });
  }

  const { name, company, email, phone, tradeLane, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "SK Internationals Website <onboarding@resend.dev>",
      to: "uthistan666@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${company}`,
      text: [
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Trade lane: ${TRADE_LANE_LABELS[tradeLane] ?? tradeLane}`,
        "",
        "Shipment details:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to send enquiry" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to send enquiry email:", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 502 });
  }
}
