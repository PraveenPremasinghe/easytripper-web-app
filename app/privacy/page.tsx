import type { Metadata } from "next";
import { generatePageMetadata, SITE_URL } from "@/lib/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy - Easy Tripper",
  description: "Privacy Policy for Easy Tripper. Learn how we handle your information when you use our Sri Lanka tour services. We respect your privacy and do not collect personal data without your consent.",
  keywords: [
    "privacy policy",
    "data protection",
    "Easy Tripper privacy",
    "Sri Lanka tour privacy",
  ],
  path: "/privacy",
  image: "/images/og-image.jpg",
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "2024";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Privacy Policy
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
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Introduction</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Easy Tripper ("we," "our," or "us"). We are committed to protecting your privacy. 
                This Privacy Policy explains how we handle information when you visit our website or use our 
                tour guide services in Sri Lanka.
              </p>
            </CardContent>
          </Card>

          {/* Information We Don't Collect */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Information We Don't Collect</h2>
              </div>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We respect your privacy and want to be transparent about our data practices:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">We do not automatically collect personal data</strong> when you browse our website.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">We do not use tracking cookies</strong> or analytics tools that collect personal information.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">We do not sell or share your information</strong> with third parties.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">We do not store payment information</strong> on our servers.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Information You Provide */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Information You Provide</h2>
              </div>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                When you contact us or book a tour, you may voluntarily provide us with:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Name and contact information (email, phone number)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Travel preferences and itinerary requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Any other information you choose to share in your inquiry</span>
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                This information is used solely to respond to your inquiries and provide our tour guide services. 
                We only use this information for the purpose for which you provided it.
              </p>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">How We Use Information</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Any information you provide is used only for:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Responding to your tour inquiries and requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Planning and organizing your custom Sri Lanka tour</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Communicating with you about your tour arrangements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Providing customer support</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we do not collect extensive personal data, we take reasonable measures to protect any 
                information you share with us. However, please note that no method of transmission over the 
                internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Third-Party Services</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible 
                for the privacy practices of these external sites. We encourage you to review the privacy 
                policies of any third-party sites you visit.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Your Rights</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Request access to any information we have about you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Request correction of any inaccurate information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Request deletion of your information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Opt-out of any communications from us</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to This Policy */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                with an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </CardContent>
          </Card>

          {/* Contact Us */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a href="mailto:info@easytripper.lk" className="text-primary hover:underline">
                    info@easytripper.lk
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
