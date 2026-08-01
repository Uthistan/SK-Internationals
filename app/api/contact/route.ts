import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Mirrors the client schema in components/sections/Contact.tsx. Duplicated
// deliberately: the browser copy is a convenience, this one is the boundary.
// Structured rate requests post to /api/quote instead — this endpoint only
// carries the short "get in touch" note.
const enquirySchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  // Free text rather than an enum of service titles: the picker is built from
  // the service pages, and a page renamed between deploys must not start
  // rejecting live enquiries at the boundary.
  service: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set, so the enquiry email cannot be sent.");
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 502 });
  }

  const { name, email, phone, company, service, message } = parsed.data;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "SK Internationals Website <onboarding@resend.dev>",
      to: "uthistan666@gmail.com",
      replyTo: email,
      // Company rides in the subject because that is what the desk triages on
      // before opening anything.
      subject: company
        ? `New enquiry from ${name} (${company})`
        : `New enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Company: ${company || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service required: ${service || "Not sure yet — advise me"}`,
        "",
        "Message:",
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
