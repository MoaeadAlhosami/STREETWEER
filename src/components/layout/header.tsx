"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineUser } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import { CartButton } from "@/components/cart/cart-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/theme-toggle";
import { useAuthStore } from "@/store/auth-store";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const t = setTimeout(() => setMounted(true), 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const authSection = mounted && isLoggedIn ? (
    <Button asChild variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-primary/10">
      <Link href="/profile" aria-label="Profile">
        <HiOutlineUser className="h-5 w-5" />
      </Link>
    </Button>
  ) : (
    <div className="hidden items-center gap-4 md:flex">
      <Button asChild variant="ghost" size="sm" className="text-[11px] font-bold uppercase tracking-widest text-foreground hover:bg-primary/10">
        <Link href="/login">Sign In</Link>
      </Button>
      <Button asChild size="sm" className="h-11 rounded-full px-8 text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
        <Link href="/register">Join Us</Link>
      </Button>
    </div>
  );

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out h-24 md:h-28 flex items-center",
      scrolled ? "header-scroll !h-20 md:!h-24" : "header-transparent"
    )}>
      <div className="container-section flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-4 group">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold transition-transform group-hover:scale-110 shadow-lg shadow-primary/20">

          </span>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-extrabold tracking-tighter uppercase text-foreground">STREETWEER</span>
            <span className="text-[9px] text-foreground/40 uppercase tracking-[0.3em] font-extrabold">Elevated Minimal</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-12 text-[11px] font-bold uppercase tracking-[0.25em] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-all hover:text-primary relative group py-2",
                pathname === link.href ? "text-primary" : "text-foreground/60",
              )}
            >
              {link.label}
              <span className={cn(
                "absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full",
                pathname === link.href ? "w-full" : ""
              )} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <CartButton />

          <div className="hidden h-8 w-[1px] bg-border md:block mx-2" />

          {authSection}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:bg-primary/10"
            aria-label="Toggle menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 bg-background md:hidden overflow-hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-10 pb-24">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "text-4xl font-extrabold uppercase tracking-[0.25em] transition-all hover:scale-105",
                      pathname === link.href ? "text-primary" : "text-foreground/40",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="h-[1px] w-16 bg-border my-6"
              />
              {(!mounted || !isLoggedIn) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col items-center gap-8 w-full px-12"
                >
                  <Link href="/login" className="text-sm font-extrabold uppercase tracking-[0.35em] text-foreground/60 hover:text-primary transition-colors">Sign In</Link>
                  <Button asChild className="w-full h-16 rounded-2xl bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-[0.35em] shadow-2xl shadow-primary/20">
                    <Link href="/register">Join the circle</Link>
                  </Button>
                </motion.div>
              )}
              {mounted && isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link href="/profile" className="text-sm font-extrabold uppercase tracking-[0.35em] text-primary">Your Profile</Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
