"use client";

import { useCallback, useEffect, useMemo, useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineFaceFrown, HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { ProductCard, ProductCardSkeleton } from "@/features/shop/components/product-card";
import { ShopFilters } from "@/features/shop/components/shop-filters";
import {
  ProductFilters,
  SortOption,
  useProducts,
} from "@/features/shop/hooks/use-products";
import { useCategories } from "@/features/shop/hooks/use-categories";
import { useBrands } from "@/features/shop/hooks/use-brands";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import Link from "next/link";

const PAGE_SIZE = 12;

const normalizeFilters = (filters: ProductFilters): ProductFilters => ({
  category: filters.category || undefined,
  query: filters.query?.trim() || undefined,
  sort: (filters.sort as SortOption | undefined) || "featured",
});

const filtersEqual = (a: ProductFilters, b: ProductFilters) => {
  const an = normalizeFilters(a);
  const bn = normalizeFilters(b);
  return an.category === bn.category && an.query === bn.query && an.sort === bn.sort;
};

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  const urlFilters = useMemo<ProductFilters>(() => {
    return normalizeFilters({
      category: searchParams.get("category") || undefined,
      sort: (searchParams.get("sort") as SortOption | null) || "featured",
      query: searchParams.get("q") || undefined,
    });
  }, [searchParams]);

  const [filters, setFilters] = useState<ProductFilters>(urlFilters);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);

  const { data: categories = [], isLoading: loadingCategories } = useCategories();
  const { data: brands = [], isLoading: loadingBrands } = useBrands();
  const { products, isLoading } = useProducts(filters);

  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) => (filtersEqual(prev, urlFilters) ? prev : urlFilters));
    }, 0);
    return () => clearTimeout(t);
  }, [urlFilters]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.query) params.set("q", filters.query);

    const nextQuery = params.toString();
    if (nextQuery !== searchKey) {
      router.replace(`${pathname}${nextQuery ? `?${nextQuery}` : ""}`, {
        scroll: false,
      });
    }
  }, [filters, pathname, router, searchKey]);

  const handleFiltersChange = useCallback((next: ProductFilters) => {
    setFilters(normalizeFilters(next));
    setPage(1);
  }, []);

  const paginatedProducts = useMemo(
    () => products?.slice(0, page * PAGE_SIZE) ?? [],
    [products, page],
  );

  const isEmpty = !isLoading && paginatedProducts.length === 0;
  const canLoadMore = (products?.length || 0) > paginatedProducts.length;

  return (
    <div className="container-section space-y-16 py-24">
      <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-border pb-12">
        <SectionHeader 
          title="Catalog" 
          subtitle="All Pieces" 
          icon={HiOutlineAdjustmentsHorizontal} 
          className="mb-0"
        />
        <Button 
          variant="outline" 
          size="lg" 
          className="h-14 rounded-full px-10 text-[11px] font-extrabold uppercase tracking-[0.25em] border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-lg shadow-primary/5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <HiOutlineAdjustmentsHorizontal className="mr-3 h-5 w-5" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </header>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <ShopFilters
              categories={categories}
              brands={brands}
              filters={filters}
              onChange={handleFiltersChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brands Section */}
      {brands.length > 0 && (
        <section className="space-y-8">
          <SectionHeader 
            title="Shop by Brand" 
            subtitle="Featured Brands" 
            icon={HiOutlineAdjustmentsHorizontal}
            align="center"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {loadingBrands ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="aspect-square rounded-2xl bg-muted/50 animate-pulse" />
              ))
            ) : (
              brands.map((brand) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link 
                    href={`/shop?brand=${brand.id}`}
                    className={cn(
                      "relative block aspect-square rounded-2xl overflow-hidden border transition-all duration-500",
                      filters.brand === String(brand.id)
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border/50 bg-muted/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    )}
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <h3 className={cn(
                        "text-center text-xs sm:text-sm font-extrabold uppercase tracking-tight transition-colors",
                        filters.brand === String(brand.id)
                          ? "text-primary"
                          : "text-foreground group-hover:text-primary"
                      )}>
                        {brand.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </section>
      )}

      <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading &&
          Array.from({ length: 8 }).map((_, idx) => <ProductCardSkeleton key={idx} />)}
        {!isLoading &&
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {isEmpty && (
        <div className="flex flex-col items-center gap-8 rounded-[4rem] border border-dashed border-border py-32 text-center bg-muted/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-premium">
            <HiOutlineFaceFrown className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            <p className="text-2xl font-extrabold uppercase tracking-tight">No items found</p>
            <p className="text-sm text-muted-foreground uppercase tracking-[0.3em] font-bold">
              Try adjusting your filters or search query.
            </p>
          </div>
          <Button variant="outline" className="h-14 rounded-full px-10 uppercase tracking-[0.25em] text-[11px] font-extrabold" onClick={() => handleFiltersChange({ sort: "featured" })}>
            Reset all
          </Button>
        </div>
      )}

      {canLoadMore && (
        <div className="flex justify-center pt-12">
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            className="min-w-[240px] h-16 rounded-full uppercase tracking-[0.4em] text-[11px] font-extrabold shadow-2xl shadow-primary/10 hover:scale-105 transition-all"
          >
            Load more
          </Button>
        </div>
      )}

      {(isLoading || loadingCategories || loadingBrands) && (
        <div className="flex justify-center pt-12">
          <Loader className="h-10 w-10" />
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container-section space-y-16 py-24">
        <div className="h-12 bg-muted rounded animate-pulse" />
        <div className="grid gap-x-6 gap-y-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
