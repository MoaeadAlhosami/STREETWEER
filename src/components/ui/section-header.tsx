"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: IconType;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-6 mb-16 relative",
      align === "center" ? "text-center flex flex-col items-center" : "text-left",
      className
    )}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4"
      >
        <div className={cn(
          "title-pill px-5 py-2",
          "rounded-full border border-border/70 bg-card/70 backdrop-blur-md",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.65),_0_18px_45px_-32px_rgba(0,0,0,0.22)]",
          "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),_0_22px_55px_-36px_rgba(0,0,0,0.75)]",
        )}>
          {Icon && <Icon className="h-4 w-4 text-primary" />}
          <span className="text-[10px] font-black tracking-[0.25em]">{title}</span>
        </div>
        <div className="h-[2px] w-20 rounded-full bg-primary/25 dark:bg-primary/35" />
      </motion.div>
      
      {subtitle && (
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl font-black uppercase tracking-tighter md:text-6xl lg:text-7xl leading-[0.9] text-foreground"
          >
            {subtitle}
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className={cn(
              "h-2 w-28 bg-primary/20 dark:bg-primary/25 rounded-full origin-left",
              align === "center" && "mx-auto origin-center"
            )}
          />
        </div>
      )}
    </div>
  );
}

