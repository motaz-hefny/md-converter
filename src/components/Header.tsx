"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, FileText, HelpCircle, MessageSquare, Shield } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-xl transition-shadow">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">MD Converter</span>
              <span className="text-xs opacity-70">by MotekLab</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" icon={<FileText size={18} />}>
              Converter
            </NavLink>
            <NavLink href="/help/" icon={<HelpCircle size={18} />}>
              Help
            </NavLink>
            <NavLink href="/faq/" icon={<MessageSquare size={18} />}>
              FAQ
            </NavLink>
            <NavLink href="/privacy/" icon={<Shield size={18} />}>
              Privacy
            </NavLink>
            <a
              href="https://www.moteklab.com/forum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#B91C1C] text-white hover:bg-[#991B1B] transition-colors"
            >
              <MessageSquare size={18} />
              <span>Forum</span>
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-[var(--border)] flex flex-col gap-2">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              Converter
            </MobileNavLink>
            <MobileNavLink href="/help/" onClick={() => setIsMenuOpen(false)}>
              Help
            </MobileNavLink>
            <MobileNavLink href="/faq/" onClick={() => setIsMenuOpen(false)}>
              FAQ
            </MobileNavLink>
            <MobileNavLink href="/privacy/" onClick={() => setIsMenuOpen(false)}>
              Privacy
            </MobileNavLink>
            <a
              href="https://www.moteklab.com/forum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#B91C1C] text-white"
            >
              <MessageSquare size={18} />
              <span>Forum</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-[var(--card)] transition-colors"
    >
      <span>{children}</span>
    </Link>
  );
}
