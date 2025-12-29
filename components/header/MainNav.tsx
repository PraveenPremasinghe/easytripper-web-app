"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Destinations", link: "/destinations" },
  { name: "Tours", link: "/tours" },
  { name: "Vehicles", link: "/vehicles" },
  { name: "Blog", link: "/blog" },
  { name: "Stories", link: "/stories" },
  { name: "Travel Tips", link: "/travel-tips" },
  { name: "Contact", link: "/contact" },
];

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo>
            <Link
              href="/"
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
            >
              <span className="text-2xl font-bold text-primary">Easy Tripper</span>
            </Link>
          </NavbarLogo>
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <NavbarButton
              as={Link}
              href="/contact"
              variant="secondary"
              className="text-foreground hover:text-primary dark:text-foreground"
            >
              Plan Your Trip
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo>
              <Link
                href="/"
                className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
              >
                <span className="text-2xl font-bold text-primary">Easy Tripper</span>
              </Link>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative block text-lg font-medium transition-colors ${
                  pathname === item.link
                    ? "text-primary"
                    : "text-neutral-600 dark:text-neutral-300 hover:text-primary"
                }`}
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 pt-4">
              <NavbarButton
                as={Link}
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Plan Your Trip
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
