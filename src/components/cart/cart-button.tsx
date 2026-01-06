"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { selectCartSummary, useCartStore } from "@/store/cart-store";

export function CartButton() {
  const items = useCartStore((state) => state.items);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(t);
  }, []);

  const { totalItems } = selectCartSummary(items);

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="relative h-10 px-3 font-medium"
      aria-label="Go to cart"
    >
      <Link href="/cart" className="inline-flex items-center gap-2">
        <HiOutlineShoppingBag className="h-5 w-5" />
        <span className="hidden sm:inline">Cart</span>
        <Badge
          variant="secondary"
          className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs"
        >
          {hydrated ? totalItems : 0}
        </Badge>
      </Link>
    </Button>
  );
}

