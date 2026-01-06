"use client";

import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineSparkles, HiOutlineCube, HiOutlineTag } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard, ProductCardSkeleton } from "@/features/shop/components/product-card";
import { useProducts } from "@/features/shop/hooks/use-products";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Stack } from "@/components/ui/stack";

export default function HomePage() {
  const { products, isLoading: loadingProducts } = useProducts({ sort: "featured" });

  const categoryImages: Record<string, string> = {
    // Local placeholders (avoid upstream 404s & reduce dev CPU/network)
    Tops: "/placeholders/photo-b.svg",
    Outerwear: "/placeholders/photo-a.svg",
    Bottoms: "/placeholders/photo-b.svg",
    Footwear: "/placeholders/photo-a.svg",
    Dresses: "/placeholders/photo-b.svg",
    Accessories: "/placeholders/photo-a.svg",
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero (blended edges + overlapping album) */}
      <section className="relative w-full overflow-hidden bg-background">
        {/* blend into page (top/bottom fade) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

        {/* soft mesh (static to reduce GPU usage) */}
        <div className="absolute inset-0 mesh-bg-light dark:mesh-bg-dark opacity-65" />

        <div className="container-section relative z-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 py-20 lg:py-28">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={cn(
                "inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/70 bg-card/70 backdrop-blur-md",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),_0_18px_45px_-32px_rgba(0,0,0,0.22)]",
                "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),_0_22px_55px_-36px_rgba(0,0,0,0.75)]"
              )}>
                <HiOutlineCube className="h-4 w-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/90">Edition 2026 — Timeless Craft</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-extrabold leading-[1.02] tracking-tight text-foreground md:text-8xl"
            >
              Elevated basics <br />
              <span className="text-foreground/35 italic font-medium">for the modern life.</span>
            </motion.h1 >
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-md text-xl leading-relaxed text-muted-foreground font-medium"
            >
              A curated selection of premium fabrics and tailored silhouettes designed to move with you—wherever the day goes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Button asChild size="lg" className="h-16 rounded-full px-10 text-[11px] font-extrabold uppercase tracking-[0.25em] shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground">
                <Link href="/shop" className="inline-flex items-center gap-3">
                  Shop Collection <HiOutlineArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-16 rounded-full border-primary/20 px-10 text-[11px] font-extrabold uppercase tracking-[0.25em] bg-transparent text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-lg shadow-primary/5">
                <Link href="/about">Our Story</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-30 flex justify-center lg:justify-end min-h-[500px] w-full max-w-[450px] lg:max-w-none lg:pr-12"
          >
            <Stack
              randomRotation={true}
              sensitivity={150}
              sendToBackOnClick={true}
              autoplay={false}
              pauseOnHover={true}
              cards={[
                { color: "from-zinc-900 via-zinc-800 to-black", label: "01" },
                { color: "from-stone-200 via-stone-300 to-stone-100", label: "02", dark: true },
                { color: "from-zinc-800 via-zinc-900 to-black", label: "03" },
                { color: "from-stone-300 via-stone-400 to-stone-200", label: "04", dark: true },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "relative w-full h-full bg-gradient-to-br flex flex-col items-center justify-center p-12 overflow-hidden",
                    item.color
                  )}
                >
                  <div className="absolute inset-0 opacity-20 mesh-bg-light dark:mesh-bg-dark" />
                  <div className="relative z-10 flex flex-col items-center space-y-6">
                    <HiOutlineCube className={cn("h-16 w-16 opacity-20", item.dark ? "text-black" : "text-white")} />
                    <div className="space-y-2 text-center">
                      <span className={cn("text-[10px] font-black tracking-[0.5em] uppercase opacity-40 block", item.dark ? "text-black" : "text-white")}>
                        Streetweer
                      </span>
                      <span className={cn("text-4xl font-black italic", item.dark ? "text-black" : "text-white")}>
                        {item.label}
                      </span>
                    </div>
                  </div>
                  {/* Glass highlight */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
                </div>
              ))}
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-section">
        <SectionHeader 
          title="The Essentials" 
          subtitle="Featured Pieces" 
          icon={HiOutlineTag}
          align="center"
        />
        
        <div className="grid gap-x-6 gap-y-12 grid-cols-2 lg:grid-cols-4">
          {loadingProducts &&
            Array.from({ length: 4 }).map((_, idx) => <ProductCardSkeleton key={idx} />)}
          {!loadingProducts &&
            products?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
        
        <div className="flex justify-center pt-20">
          <Button variant="ghost" asChild className="group h-14 rounded-full px-10 text-[11px] font-extrabold uppercase tracking-[0.4em] text-foreground hover:bg-primary/5 hover:text-primary transition-all">
            <Link href="/shop" className="flex items-center gap-3">
              Browse All Collections <HiOutlineArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-3" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Bento Grid Collections */}
      <section className="bg-muted/50 dark:bg-muted/10 py-32">
        <div className="container-section space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="title-pill">
              <HiOutlineCube className="h-4 w-4" />
              <span>Collections</span>
            </div>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl text-foreground">Curated Styles</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            {/* Main Feature - Tops */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-premium"
            >
              <Link href="/shop?category=Tops" className="relative block h-full w-full">
                <Image
                  src={categoryImages["Tops"]}
                  alt="Tops"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm brightness-90 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-center space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Discover</span>
                    <h4 className="text-3xl font-extrabold uppercase tracking-tighter text-white">Tops</h4>
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 group-hover:opacity-0 transition-opacity duration-500">
                  <h4 className="text-2xl font-extrabold uppercase tracking-widest text-white drop-shadow-lg">Tops</h4>
                </div>
              </Link>
            </motion.div>

            {/* Sub Features */}
            {["Outerwear", "Bottoms", "Footwear", "Dresses"].map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-premium",
                  category === "Footwear" ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-1"
                )}
              >
                <Link href={`/shop?category=${encodeURIComponent(category)}`} className="relative block h-full w-full">
                  <Image
                    src={categoryImages[category]}
                    alt={category}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm brightness-90 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="text-center">
                      <h4 className="text-xl font-extrabold uppercase tracking-tighter text-white">{category}</h4>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-500">
                    <h4 className="text-sm font-extrabold uppercase tracking-widest text-white drop-shadow-md">{category}</h4>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Mesh background (light + dark) */}
      <section className="container-section">
        <div className="relative overflow-hidden rounded-[4rem] p-12 md:p-24 text-center shadow-premium border border-border mesh-bg-light dark:mesh-bg-dark mesh-animate">
          <div className="mx-auto max-w-2xl space-y-12 relative z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="title-pill bg-background/70 border-border text-foreground backdrop-blur-sm dark:bg-white/10 dark:border-white/15 dark:text-white">
                <HiOutlineSparkles className="h-4 w-4" />
                <span>Join the club</span>
              </div>
              <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl text-foreground dark:text-white">The Inner Circle</h2>
            </div>
            
            <p className="text-muted-foreground dark:text-white/60 text-lg uppercase tracking-[0.2em] font-bold">
              Curated edits and private sale invitations.
            </p>
            
            <form className="flex flex-col gap-4 sm:flex-row max-w-md mx-auto">
              <Input
                placeholder="EMAIL ADDRESS"
                className="h-16 rounded-2xl border-border bg-background/70 px-8 text-foreground placeholder:text-muted-foreground/60 focus:bg-background transition-all uppercase text-[11px] font-extrabold tracking-widest backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:bg-white/10"
              />
              <Button size="lg" className="h-16 rounded-full bg-primary text-primary-foreground px-10 text-[11px] font-extrabold uppercase tracking-[0.25em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 dark:bg-white dark:text-black dark:shadow-none">
                Subscribe
              </Button>
            </form>
          </div>
          
          {/* Subtle Decorative elements */}
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-black/5 blur-[110px] dark:bg-white/5" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-black/5 blur-[110px] dark:bg-white/5" />
        </div>
      </section>
    </div>
  );
}
