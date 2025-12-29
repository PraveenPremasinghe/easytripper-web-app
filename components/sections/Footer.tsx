import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-slate-900 dark:bg-slate-950 text-slate-300 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white dark:text-slate-100">Easy Tripper</h3>
            <p className="text-sm text-slate-300 dark:text-slate-400">
              Your trusted guide to exploring the beauty of Sri Lanka. Customized
              tours and authentic experiences.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-slate-400 dark:text-slate-500 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 dark:text-slate-500 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 dark:text-slate-500 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-slate-100">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-primary">
                  Tours & Packages
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-primary">
                  Travel Stories
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="hover:text-primary">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-slate-100">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <Link href="tel:+94771234567" className="hover:text-primary">
                  +94 77 123 4567
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <Link
                  href="mailto:info@easytripper.lk"
                  className="hover:text-primary"
                >
                  info@easytripper.lk
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span>Sri Lanka</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="mb-4 font-semibold text-white dark:text-slate-100">Location</h4>
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
                alt="Sri Lanka map"
                fill
                className="object-cover opacity-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 dark:border-slate-700 pt-8 text-center text-sm text-slate-400 dark:text-slate-500">
          <p>
            © {new Date().getFullYear()} Easy Tripper. All rights reserved. | Jagath
            Premasinghe
          </p>
        </div>
      </div>
    </footer>
  );
}

