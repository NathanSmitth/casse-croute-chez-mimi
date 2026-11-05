"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import { FacebookIcon, PhoneIcon } from "./icons";

interface NavbarClientProps {
  locale: string;
  resolvedLinks: { href: string; label: string }[];
  labels: {
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    call: string;
    callAria: string;
    facebook: string;
    language: string;
  };
}

export default function NavbarClient({ locale, resolvedLinks, labels }: NavbarClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the drawer on route change (state reset during render, no effect needed)
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll + close on Escape while the drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const localizedPath = (href: string) => `/${locale}${href}`;
  const isActive = (href: string) => !href.startsWith("#") && pathname === `/${locale}${href}`;
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const transparent = isHome && !scrolled && !menuOpen;
  const facebook = siteConfig.social.facebook;

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-[var(--ease-hover)] ${
        transparent
          ? "bg-gradient-to-b from-black/45 to-transparent"
          : "bg-forest-dark/95 shadow-[0_8px_24px_-12px_rgb(16_48_26/0.6)] backdrop-blur-md"
      }`}
    >
      <nav
        aria-label={labels.mainNav}
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Link href={`/${locale}`} className="flex min-h-11 shrink-0 items-center rounded-md">
          <Logo priority />
        </Link>

        {/* Desktop links — absolutely centred regardless of side cluster widths */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {resolvedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={localizedPath(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`group relative inline-flex min-h-11 items-center px-3 text-[0.95rem] font-medium transition-colors duration-150 ${
                  isActive(link.href) ? "text-paper" : "text-paper/80 hover:text-paper"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-2 h-0.5 origin-left rounded-full bg-sage transition-transform duration-200 ease-[var(--ease-out-soft)] ${
                    isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right — language · facebook · phone */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <LocaleSwitcher locale={locale} label={labels.language} />
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={labels.facebook}
              data-track="facebook"
              data-track-location="header"
              className="inline-flex size-11 items-center justify-center rounded-md text-paper/70 transition-colors hover:text-sage"
            >
              <FacebookIcon className="size-[1.125rem]" />
            </a>
          )}
          <a
            href={siteConfig.phone.href}
            aria-label={labels.callAria}
            data-track="call"
            data-track-location="header"
            className="on-red inline-flex min-h-11 items-center gap-2 rounded-lg bg-ketchup px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-ketchup-dark active:scale-[0.97]"
          >
            <PhoneIcon className="size-4" />
            <span className="tabular">{siteConfig.phone.display}</span>
          </a>
        </div>

        {/* Mobile — phone always visible + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={siteConfig.phone.href}
            aria-label={labels.callAria}
            data-track="call"
            data-track-location="header-mobile"
            className="on-red inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-ketchup px-3 text-sm font-semibold text-white active:scale-[0.97]"
          >
            <PhoneIcon className="size-4" />
            <span>{labels.call}</span>
          </a>
          <button
            type="button"
            className="inline-flex size-11 flex-col items-center justify-center gap-1.5 rounded-md"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          >
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-paper transition-transform duration-300 ease-[var(--ease-out-soft)] ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — full height below the bar */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-forest-dark transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-soft)] lg:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col px-4 pb-10 pt-4 sm:px-6">
          <ul className="flex flex-col border-t border-paper/10">
            {resolvedLinks.map((link) => (
              <li key={link.href} className="border-b border-paper/10">
                <Link
                  href={localizedPath(link.href)}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-16 items-center font-display text-3xl font-medium ${
                    isActive(link.href) ? "text-sage" : "text-paper"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between">
            <LocaleSwitcher locale={locale} label={labels.language} />
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={labels.facebook}
                data-track="facebook"
                data-track-location="mobile-menu"
                className="inline-flex size-11 items-center justify-center rounded-md text-paper/75"
              >
                <FacebookIcon />
              </a>
            )}
          </div>

          <a
            href={siteConfig.phone.href}
            data-track="call"
            data-track-location="mobile-menu"
            className="on-red mt-auto inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-ketchup px-6 text-lg font-semibold text-white active:scale-[0.98]"
          >
            <PhoneIcon />
            <span className="tabular">{siteConfig.phone.display}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
