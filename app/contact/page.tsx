"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { motion } from "framer-motion";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+94 75 643 3267",
      href: "tel:+94756433267",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "hello@easytripper.lk", // Display text (will be obfuscated in render)
      href: "mailto:hello&#64;easytripper.lk", // Obfuscated href
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Sri Lanka",
      href: "#",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "Within 24 hours",
      href: "#",
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-800">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-neutral-600 px-4">
            Let&apos;s plan your perfect Sri Lanka adventure together
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 mb-8 sm:mb-10 md:mb-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-neutral-200">
                    <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`rounded-lg sm:rounded-xl bg-gradient-to-br ${info.color} p-2.5 sm:p-3 group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm sm:text-base text-neutral-800 mb-1">
                            {info.title}
                          </p>
                          {info.href !== "#" ? (
                    <a
                              href={info.href}
                              className="text-xs sm:text-sm md:text-base text-neutral-600 hover:text-primary transition-colors break-words"
                              onClick={(e) => {
                                // Decode email on click for better UX
                                if (info.title === "Email") {
                                  e.currentTarget.href = "mailto:hello@easytripper.lk";
                                }
                              }}
                    >
                              {info.title === "Email" ? (
                                <span dangerouslySetInnerHTML={{ __html: "hello&#64;easytripper.lk" }} />
                              ) : (
                                info.content
                              )}
                            </a>
                          ) : (
                            <p className="text-xs sm:text-sm md:text-base text-neutral-600">{info.content}</p>
                          )}
                  </div>
                </div>
              </CardContent>
            </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InquiryForm />
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <Card className="border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Quick Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                We typically respond to inquiries within 24 hours. For urgent matters, 
                please call us directly or use WhatsApp for instant communication.
              </p>
            </CardContent>
          </Card>

          <Card className="border-neutral-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600">
                Monday - Sunday: 8:00 AM - 8:00 PM (Sri Lanka Time)
                <br />
                Available 24/7 for emergencies
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
