import type { Metadata } from "next";
import { generatePageMetadata, SITE_URL } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, FileCheck, AlertCircle, Handshake } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms of Service - Easy Tripper",
  description: "Terms of Service for Easy Tripper. Read our terms and conditions for using our Sri Lanka tour guide services. Understand your rights and responsibilities when booking with us.",
  keywords: [
    "terms of service",
    "terms and conditions",
    "Easy Tripper terms",
    "Sri Lanka tour terms",
  ],
  path: "/terms",
  image: "/images/og-image.jpg",
});

export default function TermsOfServicePage() {
  const lastUpdated = "2024";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Scale className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <FileCheck className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Agreement to Terms</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Easy Tripper. By accessing or using our website and services, you agree to be bound 
                by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Our Services</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Easy Tripper provides:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Custom tour planning and itinerary design for Sri Lanka</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Professional tour guide services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Private chauffeur and vehicle services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Airport transfer services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Travel information and destination guides</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Booking and Payment */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Booking and Payment</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">Booking Process:</strong> All tour bookings are subject to 
                  availability and confirmation. We will confirm your booking via email or phone once we receive 
                  your inquiry.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Payment Terms:</strong> Payment terms will be discussed and 
                  agreed upon during the booking process. We accept various payment methods including cash, 
                  bank transfers, and credit cards (subject to availability).
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Pricing:</strong> All prices are quoted in USD unless 
                  otherwise stated. Prices are subject to change without notice, but confirmed bookings will 
                  be honored at the agreed price.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation and Refunds */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Cancellation and Refunds</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  <strong className="text-foreground">Cancellation by You:</strong> If you need to cancel your 
                  tour, please contact us as soon as possible. Cancellation policies will be discussed at the 
                  time of booking and may vary depending on the services booked.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Cancellation by Us:</strong> We reserve the right to cancel 
                  or modify tours due to circumstances beyond our control, including but not limited to weather 
                  conditions, natural disasters, or safety concerns. In such cases, we will provide a full refund 
                  or offer alternative arrangements.
                </p>
                <p className="leading-relaxed">
                  <strong className="text-foreground">Refunds:</strong> Refund policies will be clearly communicated 
                  at the time of booking. Refunds, if applicable, will be processed within a reasonable timeframe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Responsibilities */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Customer Responsibilities</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                As a customer, you agree to:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Provide accurate and complete information when making inquiries or bookings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Arrive on time for scheduled tours and activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Follow safety instructions and guidelines provided by your guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Respect local customs, culture, and regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Maintain appropriate behavior during tours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Ensure you have valid travel documents, visas, and insurance as required</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Limitation of Liability</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                While we strive to provide safe and enjoyable tour experiences, you acknowledge that:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    Travel involves inherent risks, and you participate in tours at your own risk
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    We are not liable for any loss, injury, or damage to persons or property during tours
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    We recommend that you obtain appropriate travel insurance
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    We are not responsible for delays or cancellations due to circumstances beyond our control
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, images, logos, and other materials, is the property 
                of Easy Tripper and is protected by copyright and other intellectual property laws. You may not 
                reproduce, distribute, or use our content without our written permission.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. Changes will be posted on 
                this page with an updated "Last updated" date. Your continued use of our services after changes 
                are posted constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service are governed by the laws of Sri Lanka. Any disputes arising from these 
                terms or our services will be subject to the exclusive jurisdiction of the courts of Sri Lanka.
              </p>
            </CardContent>
          </Card>

          {/* Contact Us */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Handshake className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              </div>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:hello@easytripper.lk" className="text-primary hover:underline">
                    hello@easytripper.lk
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Phone:</strong>{" "}
                  <a href="tel:+94756433267" className="text-primary hover:underline">
                    +94 75 643 3267
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Website:</strong>{" "}
                  <a href={SITE_URL} className="text-primary hover:underline">
                    {SITE_URL}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
