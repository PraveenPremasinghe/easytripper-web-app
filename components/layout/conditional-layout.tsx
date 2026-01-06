"use client";

import { usePathname } from "next/navigation";
import { TopBar } from "@/components/header/TopBar";
import { MainNav } from "@/components/header/MainNav";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { StickyInquiryBar } from "@/components/ui/sticky-inquiry-bar";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <MainNav />
      <main className="pt-[73px] sm:pt-[89px] md:pt-[97px]">{children}</main>
      <Footer />
      <WhatsAppButton />
      <StickyInquiryBar />
    </>
  );
}

