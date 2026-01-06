"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineTrash, HiOutlineShoppingBag, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { selectCartSummary, useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(t);
  }, []);

  const { subtotal, totalItems } = selectCartSummary(items);

  if (!hydrated) {
    return (
      <div className="container-section space-y-12 py-20">
        <Skeleton className="h-12 w-48 rounded-2xl" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <Skeleton className="h-96 rounded-[2.5rem]" />
          <Skeleton className="h-64 rounded-[2.5rem]" />
        </div>
      </div>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <div className="container-section py-12 md:py-20 space-y-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
        <div className="space-y-4">
          <div className="title-pill">
            <HiOutlineShoppingBag className="h-3 w-3" />
            <span>Bag</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight uppercase text-foreground">Your Selection</h1>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">{totalItems} items</p>
        </div>
        <Button asChild variant="ghost" className="text-xs font-bold uppercase tracking-widest text-foreground hover:bg-primary/5 transition-all group">
          <Link href="/shop">
            <HiOutlineArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Continue shopping
          </Link>
        </Button>
      </header>

      {isEmpty ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 py-24 text-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted shadow-sm">
            <HiOutlineShoppingBag className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-extrabold uppercase tracking-tight text-foreground">Empty bag</p>
            <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] font-bold">
              Looks like you haven&apos;t added anything yet.
            </p>
          </div>
          <Button asChild className="h-14 rounded-full px-10 uppercase tracking-widest text-[11px] font-extrabold shadow-2xl shadow-primary/20">
            <Link href="/shop">Explore Collections</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1.3fr,0.7fr]">
          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row gap-6 p-6 surface-soft group"
              >
                <div className="relative aspect-[3/4] w-24 overflow-hidden rounded-xl bg-muted sm:w-32">
                  <Link href={`/product/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                </div>
                <div className="flex flex-1 flex-col justify-between py-1">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-4">
                      <Link href={`/product/${item.id}`} className="text-lg font-extrabold uppercase tracking-tight hover:text-primary transition-colors">{item.title}</Link>
                      <p className="font-extrabold text-foreground">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex gap-3 text-[10px] font-extrabold uppercase tracking-widest text-foreground/40">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>Size: {item.selectedSize ?? "OS"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div className="premium-qty-container w-[140px] h-12">
                      <button 
                        type="button"
                        className="qty-btn-3d h-full" 
                        onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1), item.selectedSize)}
                        aria-label="Decrease quantity"
                      >
                        <HiOutlineMinus className="h-4 w-4" />
                      </button>
                      <span className="flex-1 text-center text-sm font-extrabold text-foreground tabular-nums">{item.quantity}</span>
                      <button 
                        type="button"
                        className="qty-btn-3d h-full" 
                        onClick={() => updateQty(item.id, item.quantity + 1, item.selectedSize)}
                        aria-label="Increase quantity"
                      >
                        <HiOutlinePlus className="h-4 w-4" />
                      </button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-12 w-12 text-foreground/20 hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all" onClick={() => removeItem(item.id, item.selectedSize)}>
                      <HiOutlineTrash className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <aside>
            <Card className="overflow-hidden sticky top-32">
              <CardContent className="p-10 space-y-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold uppercase tracking-tight text-foreground">Summary</h3>
                  <div className="h-[2px] w-10 bg-primary/10" />
                </div>
                
                <div className="space-y-5">
                  <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-foreground/40">
                    <span>Subtotal</span>
                    <span className="text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-foreground/40">
                    <span>Estimated Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <div className="h-[1px] w-full bg-border my-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold uppercase tracking-tight text-foreground">Total</span>
                    <span className="text-2xl font-extrabold text-foreground">{formatCurrency(subtotal)}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full h-16 rounded-2xl bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <Link href="/checkout">Checkout Now</Link>
                </Button>
                
                <p className="text-[10px] text-center text-foreground/30 uppercase tracking-widest leading-relaxed font-bold">
                  Shipping, taxes, and discounts will be calculated at checkout.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}
