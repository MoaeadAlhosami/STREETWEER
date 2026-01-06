"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { HiOutlineSparkles } from "react-icons/hi2";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock register
    setTimeout(() => {
      login({ id: "1", name: "STREETWEER User", email: "user@streetweer.com" });
      setLoading(false);
      toast({ title: "Welcome!", description: "Account created successfully." });
      router.push("/");
    }, 1000);
  };

  return (
    <div className="container-section flex min-h-[90vh] items-center justify-center py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px] space-y-12 p-16 surface-soft"
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto title-pill w-fit mb-4">
            <HiOutlineSparkles className="h-4 w-4" />
            <span>Join Us</span>
          </div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-foreground">Register</h1>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-muted-foreground">Create an account to start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-[0.3em] ml-4 text-foreground/40">Full Name</Label>
            <Input id="name" placeholder="ALEX SMITH" required className="h-16 rounded-2xl border-border bg-muted/50 px-8 text-foreground placeholder:text-foreground/20 focus:border-primary/20 transition-all font-bold tracking-widest uppercase text-[11px] shadow-inner" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-[0.3em] ml-4 text-foreground/40">Email Address</Label>
            <Input id="email" type="email" placeholder="ALEX@EXAMPLE.COM" required className="h-16 rounded-2xl border-border bg-muted/50 px-8 text-foreground placeholder:text-foreground/20 focus:border-primary/20 transition-all font-bold tracking-widest uppercase text-[11px] shadow-inner" />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password" className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-foreground/40">Password</Label>
            <Input id="password" type="password" required className="h-16 rounded-2xl border-border bg-muted/50 px-8 text-foreground focus:border-primary/20 transition-all font-bold shadow-inner" />
          </div>
          <Button type="submit" className="w-full h-16 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.35em] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.35em] text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline underline-offset-8 hover:text-primary/80 transition-all">Sign in instead</Link>
        </p>
      </motion.div>
    </div>
  );
}
