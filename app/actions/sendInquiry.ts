"use server";

import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  travelers: z.string().min(1),
  budget: z.string().min(1),
  interests: z.string().min(1),
  message: z.string().optional(),
  honeypot: z.string().optional(),
});

export async function sendInquiry(formData: z.infer<typeof inquirySchema>) {
  // Honeypot check
  if (formData.honeypot) {
    return { success: true }; // Silent success for bots
  }

  // Validate input
  const validated = inquirySchema.parse(formData);

  // Log the inquiry (in production, you'd send an email or save to database)
  console.log("New Inquiry Received:", {
    name: validated.name,
    email: validated.email,
    phone: validated.phone,
    dates: `${validated.startDate} to ${validated.endDate}`,
    travelers: validated.travelers,
    budget: validated.budget,
    interests: validated.interests,
    message: validated.message,
    timestamp: new Date().toISOString(),
  });

  // In production, you would:
  // 1. Send email using nodemailer or similar
  // 2. Save to database
  // 3. Send notification to admin

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true };
}

