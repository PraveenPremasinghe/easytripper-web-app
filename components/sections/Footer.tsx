import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Easy Tripper</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Your trusted guide to exploring the beauty of Sri Lanka. Customized
              tours and authentic experiences.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-neutral-500 dark:text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-neutral-500 dark:text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-neutral-500 dark:text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/plan-your-trip" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Plan Your Trip
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/travel-tips" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                  Travel Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-neutral-900 dark:text-neutral-100">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>info@easytripper.lk</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-center text-sm">
          <p className="text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Easy Tripper. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
