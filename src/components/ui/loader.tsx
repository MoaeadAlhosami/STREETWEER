import { cn } from "@/lib/utils";

export const Loader = ({ className }: { className?: string }) => (
  <div className={cn("h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/50 border-t-primary", className)} />
);

