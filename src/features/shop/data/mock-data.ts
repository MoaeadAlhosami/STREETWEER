import { Product } from "@/types/product";

export const mockProducts: Product[] = [
    {
        id: "1",
        title: "Minimalist Linen Blazer",
        description:
            "A lightweight, breathable blazer crafted from premium Italian linen. Perfect for elevated summer layering.",
        price: 245,
        category: "Outerwear",
        image:
            "/placeholders/photo-b.svg",
        sizes: ["46", "48", "50", "52", "54"],
        status: "new",
        rating: { rate: 4.9, count: 24 },
    },
    {
        id: "2",
        title: "Oatmeal Cashmere Crewneck",
        description:
            "Sustainably sourced Grade-A cashmere. Exceptionally soft, warm, and built to last a lifetime.",
        price: 180,
        category: "Tops",
        image:
            "/placeholders/photo-a.svg",
        sizes: ["S", "M", "L", "XL"],
        status: "featured",
        rating: { rate: 4.8, count: 56 },
    },
    {
        id: "3",
        title: "Raw Selvedge Denim",
        description: "14oz Japanese selvedge denim. Unwashed and ready to be broken in for a unique patina.",
        price: 165,
        category: "Bottoms",
        image:
            "/placeholders/photo-b.svg",
        sizes: ["30", "31", "32", "33", "34", "36"],
        status: "default",
        rating: { rate: 4.7, count: 89 },
    },
    {
        id: "4",
        title: "Chelsea Boot in Suede",
        description:
            "Handcrafted in Portugal with water-resistant Italian suede and a Goodyear-welted sole.",
        price: 320,
        category: "Footwear",
        image:
            "/placeholders/photo-a.svg",
        sizes: ["40", "41", "42", "43", "44", "45"],
        status: "featured",
        rating: { rate: 4.9, count: 42 },
    },
    {
        id: "5",
        title: "Silk Slip Dress",
        description:
            "100% heavy-weight mulberry silk. A timeless silhouette that drapes elegantly for any occasion.",
        price: 195,
        category: "Dresses",
        image:
            "/placeholders/photo-b.svg",
        sizes: ["XS", "S", "M", "L"],
        status: "sale",
        rating: { rate: 4.6, count: 31 },
    },
    {
        id: "6",
        title: "Structured Cotton Tote",
        description:
            "Heavyweight organic cotton canvas with vegetable-tanned leather handles and internal pockets.",
        price: 85,
        category: "Accessories",
        image:
            "/placeholders/photo-a.svg",
        sizes: ["One Size"],
        status: "default",
        rating: { rate: 4.5, count: 112 },
    },
];

export const mockCategories = [
    "Tops",
    "Outerwear",
    "Bottoms",
    "Footwear",
    "Dresses",
    "Accessories",
];
