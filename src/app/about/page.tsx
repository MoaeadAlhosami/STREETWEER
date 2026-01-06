"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { HiOutlineSparkles, HiOutlineCube, HiOutlineUserGroup, HiOutlineGlobeAlt } from "react-icons/hi2";

export default function AboutPage() {
  const sections = [
    {
      title: "The Founders",
      desc: "STREETWEER & Co. - A vision shared by artisans who believe in the beauty of simplicity.",
      image: "/placeholders/photo-b.svg",
      grid: "md:col-span-2 md:row-span-2",
      icon: HiOutlineUserGroup
    },
    {
      title: "Our Studio",
      desc: "Based in Oslo, where every design is conceived with architectural precision.",
      image: "/placeholders/photo-a.svg",
      grid: "md:col-span-1 md:row-span-1",
      icon: HiOutlineCube
    },
    {
      title: "Sustainable Ethics",
      desc: "Committed to transparent supply chains and organic materials.",
      image: "/placeholders/photo-b.svg",
      grid: "md:col-span-1 md:row-span-1",
      icon: HiOutlineSparkles
    },
    {
      title: "Global Vision",
      desc: "Connecting cultures through a shared appreciation for refined aesthetics.",
      image: "/placeholders/photo-a.svg",
      grid: "md:col-span-2 md:row-span-1",
      icon: HiOutlineGlobeAlt
    }
  ];

  return (
    <div className="space-y-32 py-24">
      <section className="container-section text-center space-y-8">
        <SectionHeader 
          title="The Story" 
          subtitle="STREETWEER" 
          icon={HiOutlineSparkles}
          align="center"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-xl leading-relaxed text-muted-foreground font-medium"
        >
          We are a design house led by a collective of international craftsmen. Our journey started with a simple question: why is it so hard to find the perfect essential?
        </motion.p>
      </section>

      <section className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative overflow-hidden rounded-[2.5rem] shadow-premium bg-muted/30 ${section.grid}`}
            >
              <Image 
                src={section.image} 
                alt={section.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover brightness-75 transition-transform duration-700 hover:scale-105" 
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <section.icon className="h-8 w-8 text-white/40 mb-4" />
                <h3 className="text-2xl font-extrabold uppercase tracking-widest text-white mb-2">{section.title}</h3>
                <p className="text-sm font-medium text-white/60 leading-relaxed max-w-xs">{section.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-section">
        <div className="relative overflow-hidden rounded-[4rem] py-24 text-center shadow-premium border border-border mesh-bg-light dark:mesh-bg-dark mesh-animate">
          <div className="relative z-10 max-w-3xl mx-auto space-y-12 px-6">
            <h2 className="text-5xl font-extrabold uppercase tracking-tight text-foreground dark:text-white">Our Heritage</h2>
            <p className="text-xl text-muted-foreground dark:text-white/60 leading-relaxed font-medium">
              &quot;Every piece we create is a piece of our history. We don&apos;t just sell clothing; we invite you into our studio, our process, and our philosophy of living with less, but better.&quot;
            </p>
          </div>

          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-black/5 blur-[110px] dark:bg-white/5" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-black/5 blur-[110px] dark:bg-white/5" />
        </div>
      </section>

      {/* New Section: The Process */}
      <section className="container-section space-y-24">
        <SectionHeader 
          title="The Method" 
          subtitle="Precision in Every Stitch" 
          icon={HiOutlineCube}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Conceptualization",
              desc: "Months of research and prototyping for every single silhouette."
            },
            {
              step: "02",
              title: "Material Sourcing",
              desc: "Direct partnerships with organic farms and ethical spinning mills."
            },
            {
              step: "03",
              title: "Craftsmanship",
              desc: "Finished by hand in our ateliers to ensure generational longevity."
            }
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="space-y-6 p-8 rounded-[3rem] surface-soft"
            >
              <span className="text-6xl font-black text-primary/25 dark:text-white/12 block select-none">
                {item.step}
              </span>
              <h3 className="text-xl font-extrabold uppercase tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Section: Global Community */}
      <section className="container-section space-y-24 pb-24">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <SectionHeader 
              title="Community" 
              subtitle="Beyond Fashion" 
              icon={HiOutlineGlobeAlt}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe in building a movement of conscious individuals. Our community spans across 40 countries, united by a shared appreciation for design that respects both people and the planet.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block text-4xl font-extrabold">40+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Countries</span>
              </div>
              <div>
                <span className="block text-4xl font-extrabold">12</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ateliers</span>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] rounded-[4rem] overflow-hidden shadow-premium border border-border"
          >
            <Image 
              src="/placeholders/about-community.svg"
              alt="Community" 
              fill 
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
