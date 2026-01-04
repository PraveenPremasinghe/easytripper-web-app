import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Place } from "@/lib/places";

const resend = new Resend(process.env.RESEND_API_KEY);

interface TripPlanRequest {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  places: Place[];
}

export async function POST(request: NextRequest) {
  try {
    const body: TripPlanRequest = await request.json();
    const { name, email, phone, notes, places } = body;

    // Validate required fields
    if (!name || !email || !phone || !places || places.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set in environment variables");
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Format places list
    const placesList = places
      .map((place, index) => {
        const province = place.province || "Unknown";
        return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${index + 1}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;"><strong>${place.name}</strong></td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${province}</td>
          <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${place.description || "N/A"}</td>
        </tr>`;
      })
      .join("");

    // Create HTML email
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Trip Plan Request - Easy Tripper</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🗺️ New Trip Plan Request</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Easy Tripper - Sri Lanka Travel</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Customer Information</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Phone:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;"><a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a></td>
                </tr>
              </table>

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Trip Itinerary (${places.length} ${places.length === 1 ? "Destination" : "Destinations"})</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden; margin-bottom: 30px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #374151; font-weight: 600; font-size: 14px;">#</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #374151; font-weight: 600; font-size: 14px;">Destination</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #374151; font-weight: 600; font-size: 14px;">Province</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb; color: #374151; font-weight: 600; font-size: 14px;">Description</th>
                  </tr>
                </thead>
                <tbody>
                  ${placesList}
                </tbody>
              </table>

              ${notes ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Additional Notes</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; margin-bottom: 30px;">
                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${notes}</p>
              </div>
              ` : ""}

              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-top: 30px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                  <strong>📧 Next Steps:</strong> Please contact the customer at <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${email}</a> or <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${phone}</a> to finalize their trip plan and provide a custom quote.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This email was sent from the Easy Tripper website trip planner.<br>
                <a href="https://easytripper.lk" style="color: #667eea; text-decoration: none;">easytripper.lk</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Plain text version
    const textEmail = `
New Trip Plan Request - Easy Tripper

Customer Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Trip Itinerary (${places.length} ${places.length === 1 ? "Destination" : "Destinations"}):
${places.map((place, index) => `${index + 1}. ${place.name} (${place.province || "Unknown"}) - ${place.description || "N/A"}`).join("\n")}

${notes ? `Additional Notes:\n${notes}\n` : ""}

Please contact the customer at ${email} or ${phone} to finalize their trip plan.

---
This email was sent from the Easy Tripper website trip planner.
    `.trim();

    // Determine recipient email
    // In test mode, Resend only allows sending to verified email addresses
    // Use RESEND_TO_EMAIL if set, otherwise use the verified email
    const recipientEmail = process.env.RESEND_TO_EMAIL || "easytrippertours@gmail.com";
    
    // Determine from email
    // For unverified domains, use Resend's test domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Easy Tripper <onboarding@resend.dev>";

    // Send email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `New Trip Plan Request from ${name} - ${places.length} Destinations`,
      html: htmlEmail,
      text: textEmail,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      emailId: data?.id,
    });
  } catch (error: any) {
    console.error("Error sending trip plan email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

