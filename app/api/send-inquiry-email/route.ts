import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryRequest {
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  interests: string;
  message?: string;
}

// Map interest values to display names
const interestLabels: Record<string, string> = {
  culture: "Culture & History",
  nature: "Nature & Wildlife",
  beaches: "Beaches & Relaxation",
  adventure: "Adventure & Hiking",
  food: "Food & Cuisine",
  mixed: "Mixed Experience",
};

// Map budget values to display names
const budgetLabels: Record<string, string> = {
  budget: "Budget ($30-50/day)",
  "mid-range": "Mid-range ($50-100/day)",
  luxury: "Luxury ($150+/day)",
};

export async function POST(request: NextRequest) {
  try {
    const body: InquiryRequest = await request.json();
    const { name, email, phone, startDate, endDate, travelers, budget, interests, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !startDate || !endDate || !travelers || !budget || !interests) {
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

    // Format dates
    const formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Calculate trip duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Create HTML email
    const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Travel Inquiry - Easy Tripper</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✈️ New Travel Inquiry</h1>
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

              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Trip Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Travel Dates:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">
                    ${formattedStartDate}<br>
                    <span style="color: #6b7280; font-size: 14px;">to ${formattedEndDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Duration:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">${duration} ${duration === 1 ? "day" : "days"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Number of Travelers:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">${travelers}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Budget Range:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">${budgetLabels[budget] || budget}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong style="color: #4b5563;">Interests:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #1f2937;">${interestLabels[interests] || interests}</td>
                </tr>
              </table>

              ${message ? `
              <h2 style="margin: 30px 0 20px 0; color: #1f2937; font-size: 22px; font-weight: 600;">Additional Message</h2>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; margin-bottom: 30px;">
                <p style="margin: 0; color: #4b5563; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ""}

              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-top: 30px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.6;">
                  <strong>📧 Next Steps:</strong> Please contact the customer at <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${email}</a> or <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none; font-weight: 600;">${phone}</a> to discuss their travel plans and provide a customized itinerary.
                </p>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                This email was sent from the Easy Tripper website inquiry form.<br>
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
New Travel Inquiry - Easy Tripper

Customer Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Trip Details:
- Travel Dates: ${formattedStartDate} to ${formattedEndDate}
- Duration: ${duration} ${duration === 1 ? "day" : "days"}
- Number of Travelers: ${travelers}
- Budget Range: ${budgetLabels[budget] || budget}
- Interests: ${interestLabels[interests] || interests}

${message ? `Additional Message:\n${message}\n` : ""}

Please contact the customer at ${email} or ${phone} to discuss their travel plans.

---
This email was sent from the Easy Tripper website inquiry form.
    `.trim();

    // Determine recipient email
    const recipientEmail = process.env.RESEND_TO_EMAIL || "easytrippertours@gmail.com";
    
    // Determine from email
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Easy Tripper <onboarding@resend.dev>";

    // Send email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `New Travel Inquiry from ${name} - ${duration} Days`,
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
    console.error("Error sending inquiry email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

