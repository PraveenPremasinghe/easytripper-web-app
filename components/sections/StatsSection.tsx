"use client";

import { useEffect, useRef } from "react";
import { Award, Users, Building2, Car, Languages, MapPin, CheckCircle2, Star } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const features = [
  {
    title: "Over 15 Years In Business",
    icon: Building2,
  },
  {
    title: "Best Guides",
    icon: Users,
  },
  {
    title: "Our Own Fleet of Vehicles",
    icon: Car,
  },
  {
    title: "Specialist Teams",
    icon: Award,
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          0
        );
      }

      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.4
        );
      }

      if (featuresRef.current) {
        const featureItems = featuresRef.current.children;
        tl.fromTo(
          featureItems,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.6
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-background via-slate-50 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 ref={headingRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Welcome to Easy Tripper
          </h2>
          <h3 ref={subheadingRef} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4 sm:mb-6">
            The Home of Sri Lankan Hospitality
          </h3>
          <p ref={textRef} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed font-light px-4">
            Paradise. Where else do you find perfect beaches, ancient history, vibrant culture, 
            exotic cuisine and exciting wilderness in one tiny island? Come, let&apos;s explore Sri Lanka.
          </p>
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12 px-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg bg-muted border border-border"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">{feature.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guide Profile Section - Integrated */}
        <GuideProfileContent />
      </div>
    </section>
  );
}

// Guide Profile Content Component (extracted from GuideProfile)
function GuideProfileContent() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
        animation: gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        ),
      });
    });

    return () => ctx.revert();
  }, []);

  const languages = [
    { name: "English", level: "Fluent", flag: "🇬🇧" },
    { name: "Sinhala", level: "Native", flag: "🇱🇰" },
    { name: "Tamil", level: "Fluent", flag: "🇱🇰" },
    { name: "French", level: "Basic", flag: "🇫🇷" },
    { name: "German", level: "Basic", flag: "🇩🇪" },
  ];

  const features = [
    {
      icon: Award,
      title: "Experience",
      value: "10+ Years",
      description: "Guiding tours across Sri Lanka, specializing in cultural heritage and eco-tourism",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Languages,
      title: "Languages",
      value: "5 Languages",
      description: "Fluent in English, Sinhala, and Tamil. Basic knowledge of French and German",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MapPin,
      title: "Hidden Gem",
      value: "200+ Tours",
      description: "Favorite spot: Secluded waterfall in Knuckles Mountain Range",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mt-8 sm:mt-12 md:mt-16"
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white border-2 border-gray-200 shadow-2xl">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
            {/* Guide Image */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white ring-2 sm:ring-4 ring-primary/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src="/images/guide/jagath-premasinghe.jpg"
                  alt="Jagath Premasinghe - Professional Tour Guide"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-primary to-primary-deep flex items-center justify-center text-5xl md:text-6xl">👋</div>';
                    }
                  }}
                />
              </div>
              {/* Verified Badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent to-accent-deep rounded-full border-2 sm:border-4 border-white flex items-center justify-center shadow-lg"
              >
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
              </motion.div>
              {/* Rating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border-2 border-primary shadow-lg"
              >
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-foreground">5.0</span>
              </motion.div>
            </motion.div>

            {/* Name and Title */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground font-serif"
                >
                  Jagath Premasinghe
                </motion.h3>
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                  className="text-2xl sm:text-3xl md:text-4xl"
                >
                  👋
                </motion.span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4"
              >
                <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-primary">Certified Guide</span>
                </span>
                <span className="text-sm sm:text-base md:text-lg text-primary font-semibold">
                  Professional Tour Guide & Cultural Ambassador
                </span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-2 sm:space-y-3"
              >
                <p className="text-base sm:text-lg font-medium text-foreground">
                  Hi, I&apos;m Jagath Premasinghe 👋
                </p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  With a passion for exploring the beauty and culture of Sri Lanka, I strive to provide an unforgettable experience for all my guests. Whether you&apos;re here for the lush landscapes, the rich heritage, or the pristine beaches, I&apos;ll guide you through the hidden gems of our island.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className={cn(
                    "relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200",
                    "bg-gradient-to-br from-white to-slate-50",
                    "hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  )}
                >
                  {/* Gradient Background */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-10 transition-opacity duration-300",
                    feature.color
                  )} />
                  
                  {/* Icon */}
                  <div className={cn(
                    "mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br text-white shadow-lg",
                    feature.color
                  )}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  {/* Content */}
                  <h4 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                    {feature.title}
                  </h4>
                  <p className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                    {feature.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Languages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 p-4 sm:p-6 border border-primary/20"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-foreground">Languages I Speak</h4>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {languages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xl sm:text-2xl flex-shrink-0">{lang.flag}</span>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">{lang.name}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{lang.level}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
