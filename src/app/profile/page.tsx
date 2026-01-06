"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineUser, HiOutlineShieldCheck, HiOutlineShoppingBag, HiOutlineMapPin, HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out", description: "See you soon!" });
    router.push("/");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Success", description: "Password updated successfully." });
    }, 1000);
  };

  return (
    <div className="container-section py-12 space-y-12">
      <header className="space-y-4 border-b border-black/5 pb-10">
        <div className="title-pill">
          <HiOutlineUser className="h-3 w-3" />
          <span>Profile</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight uppercase text-black">Your Account</h1>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-black/40">Manage your preferences and security</p>
      </header>

      <div className="grid gap-12 md:grid-cols-[1fr,2fr]">
        <aside className="space-y-8">
          <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-12 pt-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="h-24 w-24 rounded-full bg-black flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl">
                  {user?.name?.[0]}
                </div>
                <div>
                  <CardTitle className="text-2xl font-extrabold uppercase tracking-tight text-black">{user?.name}</CardTitle>
                  <p className="text-xs font-bold uppercase tracking-widest text-black/40 mt-1">{user?.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col divide-y divide-black/5">
                <button className="flex items-center gap-3 px-10 py-6 text-[10px] font-extrabold uppercase tracking-[0.3em] hover:bg-muted/50 transition-colors text-left text-black group">
                  <HiOutlineShoppingBag className="h-4 w-4 text-black/20 group-hover:text-black transition-colors" />
                  Orders
                </button>
                <button className="flex items-center gap-3 px-10 py-6 text-[10px] font-extrabold uppercase tracking-[0.3em] hover:bg-muted/50 transition-colors text-left text-black group">
                  <HiOutlineMapPin className="h-4 w-4 text-black/20 group-hover:text-black transition-colors" />
                  Addresses
                </button>
                <button 
                  className="flex items-center gap-3 px-10 py-6 text-[10px] font-extrabold uppercase tracking-[0.3em] hover:bg-muted/50 transition-colors text-left text-destructive group" 
                  onClick={handleLogout}
                >
                  <HiOutlineArrowLeftOnRectangle className="h-4 w-4 text-destructive/40 group-hover:text-destructive transition-colors" />
                  Logout
                </button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-12">
          <Card className="p-4">
            <CardHeader className="pb-8 border-b border-black/5 mx-6">
              <div className="flex items-center gap-3 mb-2">
                <HiOutlineShieldCheck className="h-5 w-5 text-black" />
                <CardTitle className="text-2xl font-extrabold uppercase tracking-tight text-black">Security</CardTitle>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Change your password to keep your account secure</p>
            </CardHeader>
            <CardContent className="pt-10">
              <form onSubmit={handlePasswordChange} className="space-y-8 max-w-md mx-6">
                <div className="space-y-3">
                  <Label htmlFor="current" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2 text-black/60">Current Password</Label>
                  <Input id="current" type="password" required className="h-14 rounded-2xl border-black/5 bg-muted/20 px-6 text-black focus:bg-white focus:border-black/20 transition-all font-bold" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="new" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2 text-black/60">New Password</Label>
                  <Input id="new" type="password" required className="h-14 rounded-2xl border-black/5 bg-muted/20 px-6 text-black focus:bg-white focus:border-black/20 transition-all font-bold" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="confirm" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2 text-black/60">Confirm New Password</Label>
                  <Input id="confirm" type="password" required className="h-14 rounded-2xl border-black/5 bg-muted/20 px-6 text-black focus:bg-white focus:border-black/20 transition-all font-bold" />
                </div>
                <Button type="submit" className="h-16 rounded-2xl px-12 text-[10px] font-extrabold uppercase tracking-[0.3em] bg-black text-white hover:scale-105 transition-transform" disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
