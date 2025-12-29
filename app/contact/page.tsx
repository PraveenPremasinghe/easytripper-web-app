import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { InquiryForm } from "@/components/sections/InquiryForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Jagath Premasinghe to plan your Sri Lanka adventure",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Let&apos;s plan your perfect Sri Lanka adventure together
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a
                      href="tel:+94771234567"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +94 77 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a
                      href="mailto:info@easytripper.lk"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@easytripper.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">Sri Lanka</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24 hours. For urgent
                  matters, please call us directly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-2">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}

