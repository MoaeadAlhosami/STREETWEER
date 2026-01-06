"use client";

import { useMemo } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductFilters, SortOption } from "../hooks/use-products";

interface Props {
  categories: string[];
  onChange: (filters: ProductFilters) => void;
  filters: ProductFilters;
}

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Recommended", value: "featured" },
  { label: "Price: Ascending", value: "price-asc" },
  { label: "Price: Descending", value: "price-desc" },
  { label: "Newest Arrivals", value: "newest" },
];

export function ShopFilters({ categories, onChange, filters }: Props) {
  const categoryItems = useMemo(
    () => ["All Collections", ...categories],
    [categories],
  );

  return (
    <div className="surface-soft p-12">
      <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 items-end">
        {/* Search */}
        <div className="space-y-3 md:col-span-2 lg:col-span-1">
          <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-foreground/40 ml-4">Search Catalog</label>
          <div className="relative group">
            <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="SEARCH PIECES..."
              className="pl-14 h-14 rounded-2xl bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all text-foreground font-bold uppercase text-[11px] tracking-widest"
              value={filters.query ?? ""}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-foreground/40 ml-4">Collection</label>
          <Select
            value={filters.category ?? "All Collections"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                category: value === "All Collections" ? undefined : value,
              })
            }
          >
            <SelectTrigger className="h-14 rounded-2xl border-border bg-muted/50 shadow-sm hover:border-primary/20 transition-all text-foreground font-extrabold uppercase text-[11px] tracking-widest px-6">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border shadow-2xl">
              {categoryItems.map((category) => (
                <SelectItem key={category} value={category} className="rounded-xl my-1 focus:bg-muted/50 text-[11px] font-extrabold uppercase tracking-widest py-3">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="space-y-3">
          <label className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-foreground/40 ml-4">Sort By</label>
          <Select
            value={filters.sort ?? "featured"}
            onValueChange={(value: SortOption) =>
              onChange({ ...filters, sort: value })
            }
          >
            <SelectTrigger className="h-14 rounded-2xl border-border bg-muted/50 shadow-sm hover:border-primary/20 transition-all text-foreground font-extrabold uppercase text-[11px] tracking-widest px-6">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border shadow-2xl">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="rounded-xl my-1 focus:bg-muted/50 text-[11px] font-extrabold uppercase tracking-widest py-3">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <div>
          <Button
            variant="ghost"
            className="h-14 w-full rounded-2xl uppercase tracking-[0.3em] text-[11px] font-extrabold text-foreground/40 hover:text-primary hover:bg-primary/5 transition-all"
            onClick={() => onChange({ sort: "featured" })}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
