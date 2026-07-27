"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
  ],
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/ankit9241" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ankitkumar1109" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24 border-b border-foreground/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
            {/* Brand Column */}
            <div className="max-w-md">
              <a href="#" className="inline-flex items-center gap-3 mb-4">
                <Logo className="h-6 w-6 text-foreground" />
                <span className="text-2xl font-display tracking-tight font-semibold">PodSnap</span>
                <span className="text-xs text-muted-foreground font-mono">TM</span>
              </a>

              <p className="text-muted-foreground leading-relaxed text-sm">
                Transform your long-form podcasts into viral short clips with AI. Upload once, get shareable moments instantly.
              </p>
            </div>

            {/* Links and Socials Column */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 md:self-end">
              {/* Product Navigation */}
              <nav className="flex gap-8">
                {footerLinks.Product.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              {/* Vertical divider visible on desktop */}
              <div className="hidden sm:block w-px h-6 bg-foreground/10" />

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group font-medium"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-mono">
            &copy; 2026 PodSnap. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
