"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

function LoginForm() {
  const searchParams = useSearchParams();
  const loginMutation = useLogin();
  
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ email, password });
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
            <HiOutlineArrowLeftOnRectangle className="h-4 w-4" />
            <span>Welcome Back</span>
          </div>
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-foreground">Login</h1>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-muted-foreground">Enter your credentials to access your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-[0.3em] ml-4 text-foreground/40">Email Address</Label>
            <Input id="email" name="email" type="email" placeholder="ALEX@EXAMPLE.COM" required className="h-16 rounded-2xl border-border bg-muted/50 px-8 text-foreground placeholder:text-foreground/20 focus:border-primary/20 transition-all font-bold tracking-widest uppercase text-[11px] shadow-inner" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4">
              <Label htmlFor="password" className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-foreground/40">Password</Label>
              <Link href="#" className="text-[9px] font-extrabold uppercase tracking-widest text-primary hover:underline">Forgot Password?</Link>
            </div>
            <Input id="password" name="password" type="password" required className="h-16 rounded-2xl border-border bg-muted/50 px-8 text-foreground focus:border-primary/20 transition-all font-bold shadow-inner" />
          </div>
          <Button type="submit" className="w-full h-16 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.35em] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.35em] text-muted-foreground">
          No account?{" "}
          <Link href="/register" className="text-primary underline underline-offset-8 hover:text-primary/80 transition-all">Join the circle</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="container-section flex min-h-[90vh] items-center justify-center py-24">
        <div className="w-full max-w-[500px] space-y-12 p-16 surface-soft animate-pulse">
          <div className="h-8 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
