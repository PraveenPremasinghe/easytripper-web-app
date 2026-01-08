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
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 mb-12 sm:mb-16 md:mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <div className="mb-8 sm:mb-10">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 font-serif leading-tight">Easy Tripper</h3>
              <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-md">
                Your trusted guide to exploring the beauty of Sri Lanka. Customized
                tours and authentic experiences.
              </p>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 sm:gap-5 mb-8 sm:mb-10">
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

           
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 sm:mb-8 font-bold text-xl sm:text-2xl text-white">Quick Links</h4>
            <ul className="space-y-4 sm:space-y-5">
              <li>
                <Link href="/" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link href="/tours" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Tours</span>
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Vehicles</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 sm:mb-8 font-bold text-xl sm:text-2xl text-white">Services</h4>
            <ul className="space-y-4 sm:space-y-5">
              <li>
                <Link href="/plan-your-trip" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Plan Your Trip</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Travel Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-white/85 hover:text-accent transition-colors cursor-pointer flex items-center gap-3 group font-medium text-base sm:text-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Travel Stories</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & QR Code Section */}
          <div className="lg:col-span-3">
            <h4 className="mb-6 sm:mb-8 font-bold text-xl sm:text-2xl text-white">Get In Touch</h4>
            
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
              <a href="mailto:info@easytripper.lk" className="flex items-center gap-3 text-white/85 hover:text-accent transition-colors group">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg">info@easytripper.lk</span>
              </a>
              <a href="tel:+94756433267" className="flex items-center gap-3 text-white/85 hover:text-accent transition-colors group">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg">+94 75 643 3267</span>
              </a>
            </div>
            
            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-white/90 font-semibold mb-4 text-sm sm:text-base">Scan QR Code to Contact</p>
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-2xl bg-white p-3 sm:p-4 shadow-2xl border-2 border-white/40">
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/40">
                  <div className="text-center">
                    <QrCode className="h-14 w-14 sm:h-16 sm:w-16 mx-auto text-primary mb-2" />
                    <p className="text-xs font-bold text-neutral-700 uppercase tracking-wider hidden sm:block">Scan to Contact</p>
                  </div>
                </div>
                <Image
                  src="/images/footer/qr-code.png"
                  alt="QR Code - Contact Easy Tripper"
                  fill
                  className="object-contain p-3 sm:p-4 rounded-xl"
                  onError={(e) => {
                    // QR code image not found, keep the placeholder
                  }}
                />
              </div>
            </motion.div>
          </div>
          
        </div>

         {/* Phone Number Card - Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-[500px] lg:w-[700px] mx-auto bg-gradient-to-br from-primary/40 via-accent/35 to-primary/40 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/40 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              {/* Decorative glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              {/* Phone Icon and Label */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 relative z-10">
                <div className="p-3 sm:p-4 rounded-2xl bg-white/25 backdrop-blur-sm flex-shrink-0 border border-white/30">
                  <Phone className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-white uppercase tracking-widest mb-1">Call Us Now</p>
                  <p className="text-xs sm:text-sm text-white/80">Available 24/7</p>
                </div>
              </div>
              
              {/* Large Phone Number - Golden/Yellow Color */}
              <a
                href="tel:+94756433267"
                className="block mb-6 sm:mb-8 group relative z-10"
              >
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-accent group-hover:text-accent/90 transition-colors cursor-pointer leading-none tracking-tight">
                  +94 75 643 3267
                </p>
              </a>
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                <a
                  href="tel:+94756433267"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-white text-primary rounded-xl hover:bg-accent hover:text-white transition-all text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer border border-gray-200"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Call Now</span>
                </a>
                <a
                  href="https://wa.me/94756433267"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 bg-[#25D366] text-white rounded-xl hover:bg-[#20BA5A] transition-all text-sm sm:text-base font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="whitespace-nowrap">WhatsApp</span>
                </a>
              </div>
            </motion.div>

        {/* Copyright */}
        <div className="mt-12 sm:mt-16 lg:mt-20 border-t border-white/20 pt-8 sm:pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-white/75 text-sm sm:text-base font-medium text-center sm:text-left">
              © {new Date().getFullYear()} Easy Tripper. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-white/75">
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
