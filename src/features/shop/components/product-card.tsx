"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlinePlus, HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.sizes?.[0]);
    toast({
      title: "Added to bag",
      description: `${product.title} has been added.`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: product.title,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={`/product/${product.id}`} className="group block">
        {/* Premium 3D card (stable rounded corners, no flicker) */}
        <div className="transform-gpu will-change-transform transition-all duration-500 ease-premium group-hover:-translate-y-1 sm:group-hover:-translate-y-2">
          {/* Gradient edge */}
          <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-black/12 via-black/6 to-transparent dark:from-white/12 dark:via-white/6 p-[1px]">
            {/* Inner */}
            <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-card/85 dark:bg-card/55 backdrop-blur-md border border-border/70 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),_0_24px_60px_-30px_rgba(0,0,0,0.22)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),_0_30px_70px_-35px_rgba(0,0,0,0.65)] overflow-hidden">
              {/* Media */}
              <div className="relative aspect-[3/4] rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden bg-muted/30">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 250px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground/30">
                    No image
                  </div>
                )}

                {/* Overlay (rounded) */}
                <div className="absolute inset-0 rounded-[1.25rem] sm:rounded-[1.75rem] bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-40 dark:opacity-70 transition-opacity duration-500 group-hover:opacity-70" />

                {/* Top actions row (prevents badge/favorite overlap) */}
                <div className="absolute left-3 right-3 sm:left-4 sm:right-4 top-3 sm:top-4 z-20 flex items-start justify-between gap-2 sm:gap-3">
                  {product.status && product.status !== "default" ? (
                    <Badge
                      variant="secondary"
                      className="h-7 sm:h-8 min-h-[28px] sm:min-h-[32px] px-3 sm:px-4 bg-background/90 sm:bg-background/80 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground backdrop-blur-md border border-border/60 shadow-md whitespace-nowrap leading-none flex items-center"
                    >
                      {product.status}
                    </Badge>
                  ) : (
                    <div />
                  )}

                  <Button
                    onClick={toggleFavorite}
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-full bg-background/75 opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:opacity-100 hover:bg-background hover:scale-105 text-foreground ring-1 ring-black/5 dark:ring-white/10"
                    aria-label="Toggle favorite"
                  >
                    {isFavorite ? (
                      <HiHeart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    ) : (
                      <HiOutlineHeart className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </Button>
                </div>

                {/* Quick add */}
                <Button
                  onClick={handleAdd}
                  size="icon"
                  className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 h-9 w-9 sm:h-10 sm:w-10 translate-y-4 rounded-full bg-primary text-primary-foreground opacity-0 shadow-2xl shadow-primary/25 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 active:scale-95"
                  aria-label="Quick add to cart"
                >
                  <HiOutlinePlus className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              {/* Info */}
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-[13px] font-extrabold uppercase tracking-tight text-foreground/90 transition-colors group-hover:text-primary line-clamp-2 sm:line-clamp-1 leading-tight">
                      {product.title}
                    </h3>
                    <p className="mt-1.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs sm:text-[13px] font-extrabold text-foreground self-start sm:self-auto">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <Skeleton className="aspect-[3/4] w-full rounded-[1.5rem] sm:rounded-[2rem]" />
      <div className="space-y-2 sm:space-y-3 px-4 sm:px-5">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
          <Skeleton className="h-4 sm:h-5 w-2/3" />
          <Skeleton className="h-4 sm:h-5 w-1/4 self-start sm:self-auto" />
        </div>
        <Skeleton className="h-2 sm:h-3 w-1/3" />
      </div>
    </div>
  );
}
