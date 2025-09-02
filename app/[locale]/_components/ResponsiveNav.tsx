"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LocaleSwitcher from "../_components/LocaleSwitcher";

type Props = {
  className?: string;
};

export default function ResponsiveNav({ className }: Props) {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const locale = (params?.locale ?? "tr") as "tr" | "en";

  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // ESC ile kapat
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Body scroll kilidi
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const navItems = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`relative z-20 border-b border-green-700 bg-black/70 ${
        className ?? ""
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main"
      >
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold text-green-400 hover:text-green-300 transition"
        >
          Portfolio
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-green-300">
          {navItems.map((item) => (
            <li key={item.href} className="hover:text-green-500">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        {/* Locale + CTA (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button className="border border-green-400 text-green-400 px-3 py-1 rounded">
            <LocaleSwitcher locale={locale} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={toggle}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-green-600 p-2 text-green-300 hover:text-green-100 hover:border-green-400"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              ref={overlayRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-green-700 bg-black/95 shadow-[0_0_30px_rgba(16,185,129,0.25)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-green-800/60">
                <span className="text-lg font-semibold text-green-400">
                  Menu
                </span>
                <button
                  aria-label="Close menu"
                  onClick={close}
                  className="rounded-lg border border-green-700 p-2 text-green-300 hover:text-green-100 hover:border-green-400"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block rounded-lg px-4 py-3 text-green-300 hover:text-green-100 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t border-green-800/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className=""></span>
                  <button className="border border-green-400 text-green-400 px-3 py-1 rounded">
                    <LocaleSwitcher locale={locale} />
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
