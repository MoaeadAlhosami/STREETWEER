"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi2";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { selectCartSummary, useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { items } = useCartStore();
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
        <Skeleton className="h-96 rounded-[2.5rem]" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-section flex flex-col items-center gap-6 py-24 text-center">
        <p className="text-2xl font-extrabold uppercase tracking-tight text-foreground">Your bag is empty</p>
        <Button asChild className="h-14 rounded-full px-10 uppercase tracking-widest text-[11px] font-extrabold shadow-2xl shadow-primary/20 mt-4">
          <Link href="/shop">Browse Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-section py-12 md:py-20 space-y-12">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
        <div className="space-y-4">
          <div className="title-pill">
            <HiOutlineLockClosed className="h-3 w-3" />
            <span>Secure</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight uppercase text-foreground">Checkout</h1>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">{totalItems} items in your bag</p>
        </div>
        <Button asChild variant="ghost" className="text-xs font-bold uppercase tracking-widest text-foreground hover:bg-primary/5 transition-all group">
          <Link href="/cart">
            <HiOutlineArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to bag
          </Link>
        </Button>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <Card className="overflow-hidden">
            <CardContent className="p-12 space-y-12">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-extrabold">1</span>
                <h2 className="text-2xl font-extrabold uppercase tracking-tight text-foreground">Shipping Information</h2>
              </div>
              
              <div className="grid gap-10 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-4 text-foreground/40">First name</Label>
                  <Input id="firstName" name="firstName" placeholder="ALEX" required className="h-16 rounded-2xl border-border bg-background px-8 text-foreground font-bold shadow-sm focus:border-primary/20 transition-all uppercase tracking-widest text-[11px]" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-4 text-foreground/40">Last name</Label>
                  <Input id="lastName" name="lastName" placeholder="SMITH" required className="h-16 rounded-2xl border-border bg-background px-8 text-foreground font-bold shadow-sm focus:border-primary/20 transition-all uppercase tracking-widest text-[11px]" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-4 text-foreground/40">Email address</Label>
                  <Input id="email" name="email" type="email" placeholder="YOU@EXAMPLE.COM" required className="h-16 rounded-2xl border-border bg-background px-8 text-foreground font-bold shadow-sm focus:border-primary/20 transition-all uppercase tracking-widest text-[11px]" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="address" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-4 text-foreground/40">Street address</Label>
                  <Input id="address" name="address" placeholder="123 MARKET STREET" required className="h-16 rounded-2xl border-border bg-background px-8 text-foreground font-bold shadow-sm focus:border-primary/20 transition-all uppercase tracking-widest text-[11px]" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="notes" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-4 text-foreground/40">Order notes (Optional)</Label>
                  <Textarea id="notes" name="notes" placeholder="ANY SPECIFIC DELIVERY INSTRUCTIONS?" className="min-h-[120px] rounded-[2rem] border-border bg-background p-8 text-foreground font-bold shadow-sm focus:border-primary/20 transition-all uppercase tracking-widest text-[11px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 py-6 text-foreground/20">
            <HiOutlineShieldCheck className="h-6 w-6" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em]">SSL Encrypted Payment Processing</span>
          </div>
        </motion.div>

        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="overflow-hidden sticky top-32">
            <CardContent className="p-10 space-y-10">
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold uppercase tracking-tight text-foreground">Order Summary</h3>
                <div className="h-[2px] w-10 bg-primary/10" />
              </div>

              <div className="space-y-8 max-h-[400px] overflow-auto pr-4 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-muted shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-extrabold uppercase tracking-tight text-foreground line-clamp-1">{item.title}</p>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-foreground/40">
                          Qty {item.quantity} • {item.selectedSize ?? "OS"}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-foreground">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="h-[1px] w-full bg-border" />
              
              <div className="space-y-5">
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-foreground/40">
                  <span>Subtotal</span>
                  <span className="text-foreground">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-foreground/40">
                  <span>Shipping</span>
                  <span className="text-foreground">Complimentary</span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm font-extrabold uppercase tracking-tight text-foreground">Order Total</span>
                  <span className="text-3xl font-extrabold text-foreground">{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <Button className="w-full h-16 rounded-2xl bg-primary text-primary-foreground text-[11px] font-extrabold uppercase tracking-[0.3em] shadow-2xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                <HiOutlineLockClosed className="mr-2 h-4 w-4" /> Finalize Order
              </Button>
              
              <p className="text-[10px] text-center text-foreground/30 uppercase tracking-widest leading-relaxed font-bold">
                By clicking finalize order, you agree to our terms of service and refund policy.
              </p>
            </CardContent>
          </Card>
        </motion.aside>
      </div>
    </div>
  );
}
