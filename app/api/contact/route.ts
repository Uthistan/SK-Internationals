import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { DESTINATION_LABELS } from "@/content/destinations";

const enquirySchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  destination: z.string().min(1),
  message: z.string().min(10),
});

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

  const { name, company, email, phone, destination, message } = parsed.data;

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
        `Destination / country of export: ${
          DESTINATION_LABELS[destination] ?? destination
        }`,
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
