import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

export function Footer() {
  return (
    <footer className="bg-muted/30 dark:bg-muted/10 border-t border-border mt-32">
      <div className="container-section py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-extrabold transition-transform group-hover:scale-110 shadow-lg shadow-primary/20">

              </span>
              <span className="text-xl font-extrabold uppercase tracking-tighter text-foreground">STREETWEER</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground font-medium">
              Elevating the everyday through a minimalist lens. Crafted for durability, designed for international standards.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-foreground">Navigation</h4>
            <div className="flex flex-col gap-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/shop" className="hover:text-primary transition-all flex items-center gap-2 group">
                <HiOutlineArrowRight className="h-3 w-3 -ml-5 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                Catalog
              </Link>
              <Link href="/about" className="hover:text-primary transition-all flex items-center gap-2 group">
                <HiOutlineArrowRight className="h-3 w-3 -ml-5 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                Our Story
              </Link>
              <Link href="/contact" className="hover:text-primary transition-all flex items-center gap-2 group">
                <HiOutlineArrowRight className="h-3 w-3 -ml-5 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-foreground">Collections</h4>
            <div className="flex flex-col gap-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/shop?category=Outerwear" className="hover:text-primary transition-all">Outerwear</Link>
              <Link href="/shop?category=Tops" className="hover:text-primary transition-all">Premium Tops</Link>
              <Link href="/shop?category=Bottoms" className="hover:text-primary transition-all">Essential Bottoms</Link>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-foreground">Support</h4>
            <div className="flex flex-col gap-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              <a href="mailto:hello@streetweer.com" className="hover:text-primary transition-all">Inquiries</a>
              <Link href="#" className="hover:text-primary transition-all">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-all">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-muted-foreground/50">
            © {new Date().getFullYear()} STREETWEER — All rights reserved.
          </span>
          <div className="flex gap-10">
            <div className="h-4 w-4 rounded-full bg-primary/20" />
            <div className="h-4 w-4 rounded-full bg-primary/10" />
            <div className="h-4 w-4 rounded-full bg-primary/5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
