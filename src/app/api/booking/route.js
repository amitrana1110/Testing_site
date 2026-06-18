// src/app/api/booking/route.js
// Server-side API route — never exposed to the browser

import nodemailer from "nodemailer";

// ============================================================
// Add these to your .env.local file:
//
// EMAIL_HOST=smtp.gmail.com
// EMAIL_PORT=587
// EMAIL_USER=your@gmail.com
// EMAIL_PASS=your-16-char-app-password
// EMAIL_TO=owner@yatracabs.com
// ============================================================

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      pickup,
      destination,
      travelDate,
      passengers,
      vehicle,
      tripType,
      honeypot, // ANTIGRAVITY CHANGE: honeypot field
    } = body;

    // ANTIGRAVITY CHANGE: Reject spam bots that automatically fill hidden honeypot inputs
    if (honeypot) {
      console.warn("Spam Bot blocked via honeypot field validation.");
      return Response.json(
        { success: false, message: "Request flagged as spam." },
        { status: 400 },
      );
    }

    // Basic validation
    if (!name || !phone || !pickup || !destination || !travelDate) {
      return Response.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    // ANTIGRAVITY CHANGE: Added validation for environment variables to check if mailer is properly configured.
    // The original .env file was located in `src/components/Forms/.env`, which Next.js doesn't load automatically.
    // Moving the environment variables to the project root in `.env.local` fixes the issue.
    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.EMAIL_TO
    ) {
      console.error(
        "Nodemailer Error: Missing mailer environment variables in process.env. Please make sure .env.local is at the root of the project.",
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

    // ── Email sent to OWNER ─────────────────────────────────
    await transporter.sendMail({
      from: `"RanaTaxiService Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🚕 New Booking — ${pickup} → ${destination} | ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px;">

          <!-- Header -->
          <div style="background: #F5A800; padding: 20px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 24px;">
            <h2 style="margin: 0; color: #111; font-size: 20px;">🚕 New Booking Request</h2>
            <p style="margin: 4px 0 0; color: #333; font-size: 14px;">Received from YatraCabs website</p>
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

            <tr style="background: #f9f9f9;">
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">🔄 Trip Type</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee; text-transform: capitalize;">
                ${tripType === "round-trip" ? "Round Trip" : "One Way"}
              </td>
            </tr>

            <tr>
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">📍 Pickup</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">${pickup}</td>
            </tr>

            <tr style="background: #f9f9f9;">
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">🏁 Destination</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">${destination}</td>
            </tr>

            <tr>
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">📅 Travel Date</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">${travelDate}</td>
            </tr>

            <tr style="background: #f9f9f9;">
              <td style="padding: 12px 16px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">👥 Passengers</td>
              <td style="padding: 12px 16px; color: #111; border-bottom: 1px solid #eee;">${passengers}</td>
            </tr>

            <tr>
              <td style="padding: 12px 16px; font-weight: 600; color: #555;">🚗 Vehicle</td>
              <td style="padding: 12px 16px; color: #111;">${vehicle || "Not selected"}</td>
            </tr>

          </table>

          <!-- CTA -->
          <div style="margin-top: 24px; padding: 16px; background: #FFF8E7; border-left: 4px solid #F5A800; border-radius: 4px;">
            <p style="margin: 0; color: #555; font-size: 14px;">
              📲 Call <strong style="color: #111;">${phone}</strong> to confirm this booking.
            </p>
          </div>

          <!-- Footer -->
          <p style="margin-top: 24px; color: #aaa; font-size: 12px; text-align: center; border-top: 1px solid #eee; padding-top: 16px;">
            RanaTaxiServices · Automated Booking Notification · Do not reply to this email
          </p>

        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Booking sent successfully!",
    });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return Response.json(
      { success: false, message: "Failed to send booking. Please try again." },
      { status: 500 },
    );
  }
}
