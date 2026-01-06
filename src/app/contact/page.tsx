"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "@/components/ui/section-header";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to send a message.",
      });
      router.push("/login?redirect=/contact");
      return;
    }

    setLoading(true);
    // Mock send
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent",
        description: "We'll get back to you shortly."
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="container-section py-24 space-y-24">
      <SectionHeader
        title="Get in touch"
        subtitle="Contact Us"
        icon={HiOutlineChatBubbleBottomCenterText}
        align="center"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-16"
        >
          <div className="space-y-8">
            <h3 className="text-3xl font-extrabold uppercase tracking-tight">Our Studio</h3>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              We&apos;re here to assist with size inquiries, styling advice, or order information. Our team responds within 24 hours.
            </p>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                <HiOutlineEnvelope className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-1">Email Us</p>
                <p className="text-lg font-bold">hello@streetweer.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                <HiOutlineMapPin className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-1">Visit Us</p>
                <p className="text-lg font-bold">123 Minimalist Way, Oslo, NO</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="h-16 w-16 rounded-3xl bg-primary/5 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                <HiOutlinePhone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground mb-1">Call Us</p>
                <p className="text-lg font-bold">+47 21 00 00 00</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-12 surface-soft"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2">Name</Label>
                <Input id="name" placeholder="ALEX SMITH" required className="h-14 rounded-2xl bg-muted/50 border-border shadow-inner focus:border-primary/20 font-bold uppercase text-[11px] tracking-widest px-6" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2">Email</Label>
                <Input id="email" type="email" placeholder="ALEX@EXAMPLE.COM" required className="h-14 rounded-2xl bg-muted/50 border-border shadow-inner focus:border-primary/20 font-bold uppercase text-[11px] tracking-widest px-6" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-[10px] font-extrabold uppercase tracking-[0.2em] ml-2">Message</Label>
              <Textarea id="message" placeholder="HOW CAN WE HELP YOU?" required className="min-h-[180px] rounded-[2rem] bg-muted/50 border-border shadow-inner focus:border-primary/20 font-bold p-8 uppercase text-[11px] tracking-widest" />
            </div>
            <Button type="submit" className="w-full h-16 rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.3em] bg-primary text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {!isLoggedIn && (
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Signing in will keep your inquiries organized in your profile.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
