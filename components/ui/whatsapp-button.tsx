"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = "+94756433267", // Update with actual number
  message = "Hello! I'm interested in planning a trip to Sri Lanka.",
  className,
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className={`fixed bottom-18 right-6 z-50 ${className}`}
    >
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full bg-[#25D366] border-2 border-[#25D366] px-6 py-4 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl hover:border-[#20BA5A] cursor-pointer font-medium"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="hidden text-sm font-semibold text-white sm:block">
          Chat with us
        </span>
        <motion.div
          className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Link>
    </motion.div>
  );
}
