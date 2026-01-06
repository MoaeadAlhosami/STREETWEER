"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineArrowLeft, HiOutlineShoppingBag, HiOutlineHeart, HiOutlineShieldCheck, HiOutlineCheckBadge, HiOutlineTag, HiHeart, HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useProduct } from "@/features/shop/hooks/use-products";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock disabled sizes for demonstration as requested
  const disabledSizes = useMemo(() => ["XS", "XXL"], []);

  useEffect(() => {
    if (product?.sizes?.length) {
      const t = setTimeout(() => setSelectedSize(product.sizes?.[0]), 0);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [product]);

  const gallery = useMemo(
    () => (product?.images?.length ? product.images : product?.image ? [product.image] : []),
    [product],
  );

  const handleAdd = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize);
    toast({
      title: "Added to bag",
      description: `${product.title} has been added.`,
    });
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: product?.title || "Product",
    });
  };

  if (isLoading || !product) {
    return (
      <div className="container-section grid gap-12 py-20 md:grid-cols-2">
        <Skeleton className="aspect-[3/4] w-full rounded-[2.5rem]" />
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="space-y-4 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="container-section py-12 md:py-20">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-8 group text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-black"
      >
        <HiOutlineArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to collections
      </Button>

      <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-muted/30 border border-border/40 shadow-premium"
        >
          {gallery.length ? (
            <Image
              src={gallery[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground/50">No image</div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10 lg:py-4"
        >
          <div className="space-y-4">
            <div className="title-pill bg-primary/5 border-primary/10">
              <HiOutlineTag className="h-3 w-3 text-primary" />
              <span className="text-primary">{product.category}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl uppercase leading-[0.9] text-foreground">{product.title}</h1>
            <p className="text-2xl font-bold tracking-tight text-foreground/80">{formatCurrency(product.price)}</p>
          </div>

          <div className="h-[1px] w-full bg-border/40" />

          <div className="space-y-10">
            <p className="text-base leading-relaxed text-muted-foreground font-medium">{product.description}</p>

            {/* Size Selection */}
            {product.sizes?.length ? (
              <div className="space-y-4">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] ml-1 text-muted-foreground">Select Size</label>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "size-circle",
                        selectedSize === size ? "size-circle-active" : "bg-background border-border text-foreground/60 hover:border-primary/50 hover:text-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                  {disabledSizes.map((size) => (
                    <div
                      key={size}
                      className="size-circle size-circle-disabled"
                      title="Out of Stock"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Quantity and Actions */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] ml-1 text-muted-foreground">Quantity</label>
                <div className="premium-qty-container w-full">
                  <button
                    type="button"
                    className="qty-btn-3d flex-1"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <HiOutlineMinus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-extrabold text-lg tabular-nums">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn-3d flex-1"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <HiOutlinePlus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-end">
                <div className="flex gap-3">
                  <Button
                    onClick={handleAdd}
                    className="h-14 flex-1 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-xl shadow-primary/10 active:scale-[0.98] transition-all"
                  >
                    <HiOutlineShoppingBag className="mr-2 h-5 w-5" /> Add to bag
                  </Button>
                  <Button
                    type="button"
                    onClick={toggleFavorite}
                    variant="outline"
                    className="h-14 w-14 rounded-2xl border-border bg-background shadow-sm hover:bg-muted/30 transition-all flex items-center justify-center p-0"
                  >
                    {isFavorite ? (
                      <HiHeart className="h-6 w-6 text-red-500 transition-transform scale-110" />
                    ) : (
                      <HiOutlineHeart className="h-6 w-6 text-foreground transition-transform group-hover:scale-110" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row gap-8 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/80">
                <HiOutlineShieldCheck className="h-5 w-5 text-foreground" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/80">
                <HiOutlineCheckBadge className="h-5 w-5 text-foreground" />
                <span>Lifetime Fit</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
