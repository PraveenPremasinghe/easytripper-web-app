"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, QrCode, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative border-t-2 border-primary/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 mb-10 sm:mb-12 md:mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 font-serif">Easy Tripper</h3>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                Your trusted guide to exploring the beauty of Sri Lanka. Customized
                tours and authentic experiences.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link
                href="#"
                className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white transition-all hover:text-primary hover:bg-white hover:border-primary hover:shadow-xl hover:scale-110 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="#"
                className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white transition-all hover:text-primary hover:bg-white hover:border-primary hover:shadow-xl hover:scale-110 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="#"
                className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white transition-all hover:text-primary hover:bg-white hover:border-primary hover:shadow-xl hover:scale-110 cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            </div>

            {/* Phone Number Card - Moved to Left Side Below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 border-white/30 shadow-2xl backdrop-blur-sm"
            >
              {/* Phone Icon and Label */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="p-2 sm:p-3 md:p-4 rounded-xl bg-white/20 backdrop-blur-sm flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-white/90 uppercase tracking-wider">Call Us Now</p>
                  <p className="text-[10px] sm:text-xs text-white/70">Available 24/7</p>
                </div>
              </div>
              
              {/* Large Phone Number - Single Line */}
              <a
                href="tel:+94756433267"
                className="block mb-4 sm:mb-5 group"
              >
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-white group-hover:text-accent transition-colors cursor-pointer leading-none tracking-tight break-all">
                  +94 75 643 3267
                </p>
              </a>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <a
                  href="tel:+94756433267"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-white text-primary rounded-xl hover:bg-accent hover:text-white transition-all text-xs sm:text-sm md:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Call Now</span>
                </a>
                <a
                  href="https://wa.me/94756433267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-3.5 bg-[#25D366] text-white rounded-xl hover:bg-[#20BA5A] transition-all text-xs sm:text-sm md:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="whitespace-nowrap">WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 sm:mb-6 font-bold text-lg sm:text-xl text-white">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Vehicles</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 sm:mb-6 font-bold text-lg sm:text-xl text-white">Services</h4>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <Link href="/plan-your-trip" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Plan Your Trip</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Travel Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-white/80 hover:text-white hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Travel Stories</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & QR Code Section */}
          <div className="lg:col-span-4">
            <h4 className="mb-4 sm:mb-6 font-bold text-lg sm:text-xl text-white">Get In Touch</h4>
            
            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
               
            >
              <p className="text-white/90 font-medium mb-3 text-xs sm:text-sm">Scan QR Code to Contact</p>
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl sm:rounded-2xl bg-white p-2 sm:p-3 md:p-4 shadow-xl border-2 sm:border-4 border-white/30">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-dashed border-primary/40">
                  <div className="text-center">
                    <QrCode className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary mb-1 sm:mb-2" />
                    <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider hidden sm:block">Scan to Contact</p>
                  </div>
                </div>
                <Image
                  src="/images/footer/qr-code.png"
                  alt="QR Code - Contact Easy Tripper"
                  fill
                  className="object-contain p-2 sm:p-3 rounded-lg sm:rounded-xl"
                  onError={(e) => {
                    // QR code image not found, keep the placeholder
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 sm:mt-12 lg:mt-16 border-t-2 border-white/20 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-white/80 text-sm sm:text-base font-medium text-center sm:text-left">
              © {new Date().getFullYear()} Easy Tripper. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/80">
              <Link href="/privacy" className="hover:text-accent transition-colors cursor-pointer font-medium text-sm sm:text-base">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition-colors cursor-pointer font-medium text-sm sm:text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
