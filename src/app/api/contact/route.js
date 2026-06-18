// src/app/api/contact/route.js
// Server-side API route for contact form requests — never exposed to the browser

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      message,
      honeypot, // Honeypot field for spam protection
    } = body;

    // Reject spam bots that fill hidden honeypot inputs
    if (honeypot) {
      console.warn(
        "Spam Bot blocked via honeypot field validation on Contact Form.",
      );
      return Response.json(
        { success: false, message: "Request flagged as spam." },
        { status: 400 },
      );
    }

    // Basic validation
    if (!name || !phone) {
      return Response.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    // Validate environment variables
    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_TO
    ) {
      console.error(
        "Nodemailer Error: Missing mailer environment variables in process.env.",
      );
      return Response.json(
        {
          success: false,
          message:
            "Mailer configuration error. Please contact the administrator.",
        },
        { status: 500 },
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to owner
    await transporter.sendMail({
      from: `"RanaTaxiService Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🚕 New Contact Inquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px;">

          <!-- Header -->
          <div style="background: #F5A800; padding: 20px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 24px;">
            <h2 style="margin: 0; color: #111; font-size: 20px;">🚕 New Contact Inquiry</h2>
            <p style="margin: 4px 0 0; color: #333; font-size: 14px;">Received from YatraCabs website contact & about page</p>
          </div>

          <!-- Details Table -->
          <table style="width: 100%; border-collapse: collapse;">

            <tr style="background: #f9f9f9;">
              <td style="padding: 12px 16px; font-weight: 600; color: #555; width: 38%; border-bottom: 1px solid #eee;">👤 Name</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">${name}</td>
            </tr>

            <tr>
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">📞 Phone</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}" style="color: #F5A800; text-decoration: none; font-weight: 600;">${phone}</a>
              </td>
            </tr>

          </table>

          <!-- Message -->
          <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px;">
            <p style="margin: 0 0 8px; font-weight: 600; color: #334155; font-size: 14px;">📝 Message:</p>
            <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message || "No message provided."}</p>
          </div>

          <!-- CTA -->
          <div style="margin-top: 24px; padding: 16px; background: #FFF8E7; border-left: 4px solid #F5A800; border-radius: 4px;">
            <p style="margin: 0; color: #555; font-size: 14px;">
              📲 Call <strong style="color: #111;">${phone}</strong> to follow up on this inquiry.
            </p>
          </div>

          <!-- Footer -->
          <p style="margin-top: 24px; color: #aaa; font-size: 12px; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
            RanaTaxiServices · Automated Contact Notification · Do not reply to this email
          </p>

        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Inquiry sent successfully!",
    });
  } catch (error) {
    console.error("Nodemailer Contact Inquiry error:", error);
    return Response.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
