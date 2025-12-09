import { Phone, Mail } from "lucide-react";
import Link from "next/link";

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-slate-50/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
          <div className="flex items-center gap-6">
            <Link
              href="tel:+94771234567"
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-primary"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
              <span>+94 77 123 4567</span>
            </Link>
            <Link
              href="mailto:info@easytripper.lk"
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-primary"
              aria-label="Email us"
            >
              <Mail className="h-4 w-4" />
              <span>info@easytripper.lk</span>
            </Link>
          </div>
          <div className="text-slate-600">
            Your trusted guide to Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
}

