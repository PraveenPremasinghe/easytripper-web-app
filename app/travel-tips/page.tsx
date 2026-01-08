"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plane, 
  DollarSign, 
  Smartphone, 
  MapPin,
  Utensils,
  Camera,
  Heart,
  AlertCircle,
  CheckCircle2,
  Info,
  ArrowRight,
  Globe,
  Clock,
  Zap,
  Phone,
  Building2
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

const travelTips = [
  {
    category: "Before You Go",
    icon: Plane,
    color: "bg-blue-500/10 text-blue-600",
    tips: [
      {
        title: "Visa Requirements",
        content: "Most visitors need an Electronic Travel Authorization (ETA). Apply online at eta.gov.lk before your trip. The ETA is valid for 30 days and costs $50 USD. You can also get a visa on arrival, but online is recommended to avoid queues."
      },
      {
        title: "Vaccinations",
        content: "No mandatory vaccinations, but Hepatitis A and Typhoid are recommended. Consult your doctor 4-6 weeks before travel. Make sure routine vaccines (MMR, DTP) are up to date."
      },
      {
        title: "Travel Insurance",
        content: "Highly recommended! Covers medical emergencies, trip cancellations, and lost luggage. Check that your policy covers adventure activities if you plan on hiking or water sports."
      },
      {
        title: "What to Pack",
        content: "Lightweight, breathable clothing for tropical climate. Modest clothing for temples (cover shoulders and knees). Comfortable walking shoes, sunscreen, insect repellent, hat, and a light jacket for hill country. Don't forget adapters (Type D, G plugs) and a power bank."
      }
    ]
  },
  {
    category: "Money & Currency",
    icon: DollarSign,
    color: "bg-green-500/10 text-green-600",
    tips: [
      {
        title: "Currency",
        content: "Sri Lankan Rupee (LKR). Exchange rate approximately 1 USD = 300-330 LKR (check current rates). Exchange at airport, banks, or authorized money changers. Keep receipts for currency exchange."
      },
      {
        title: "Cash vs Cards",
        content: "Cash is king, especially in smaller towns and local establishments. Credit cards accepted in hotels, larger restaurants, and city shops. ATMs widely available in cities and tourist areas. Carry cash for tips, small purchases, and rural areas."
      },
      {
        title: "Tipping",
        content: "Tipping is appreciated but not mandatory. 10% in restaurants if service charge not included. 500-1000 LKR for guides and drivers per day. Small tips for hotel staff, porters (200-500 LKR)."
      },
      {
        title: "Budget Planning",
        content: "Budget: $30-50/day, Mid-range: $50-100/day, Luxury: $150+/day. Local food is very affordable ($2-5 per meal), while international restaurants cost more ($10-30). Accommodation ranges from $15 (guesthouses) to $200+ (luxury resorts)."
      }
    ]
  },
  {
    category: "Getting Around",
    icon: MapPin,
    color: "bg-purple-500/10 text-purple-600",
    tips: [
      {
        title: "Transportation Options",
        content: "Private driver/guide (most convenient, $50-80/day), trains (scenic, especially hill country, $5-20), buses (cheap but crowded, $1-5), domestic flights (for longer distances), tuk-tuks (great for short city trips, negotiate price first)."
      },
      {
        title: "Driving",
        content: "Left-hand traffic. International driving permit required. Roads can be challenging with heavy traffic in cities. Consider hiring a driver instead of self-driving for safety and convenience."
      },
      {
        title: "Train Travel",
        content: "Highly recommended for scenic routes (Kandy to Ella, Nuwara Eliya). Book 1st or 2nd class in advance. Observation car on some routes offers best views. Very affordable and comfortable."
      }
    ]
  },
  {
    category: "Communication",
    icon: Smartphone,
    color: "bg-orange-500/10 text-orange-600",
    tips: [
      {
        title: "SIM Cards & Internet",
        content: "Get a tourist SIM at airport or from providers (Dialog, Mobitel, Hutch). Tourist packages with data cost $5-10 USD. 4G coverage good in tourist areas. Many hotels and cafes offer free WiFi."
      },
      {
        title: "Language",
        content: "Sinhala and Tamil are official languages. English widely spoken in tourist areas, hotels, and by guides. Learning basic Sinhala phrases (hello: 'Ayubowan', thank you: 'Istuti') is appreciated."
      },
      {
        title: "Emergency Numbers",
        content: "Police: 119, Ambulance: 110, Tourist Police: +94 11 242 1052. Keep embassy contact information. Save your guide's number and hotel address."
      }
    ]
  },
  {
    category: "Culture & Etiquette",
    icon: Heart,
    color: "bg-pink-500/10 text-pink-600",
    tips: [
      {
        title: "Temple Etiquette",
        content: "Remove shoes and hats before entering. Cover shoulders and knees (both men and women). No photography of Buddha statues with your back to them. Don't point feet toward Buddha images. Be quiet and respectful."
      },
      {
        title: "Greetings",
        content: "Traditional greeting is 'Ayubowan' (may you live long) with hands together. Handshakes common in business settings. Remove shoes when entering homes."
      },
      {
        title: "Dress Code",
        content: "Modest clothing appreciated, especially in rural areas and temples. Beachwear fine at beaches, but cover up when leaving. Light, breathable fabrics best for climate."
      },
      {
        title: "Photography",
        content: "Ask permission before photographing people, especially in rural areas. Some temples charge photography fees. Drones require permission. Be respectful at religious sites."
      }
    ]
  },
  {
    category: "Food & Dining",
    icon: Utensils,
    color: "bg-red-500/10 text-red-600",
    tips: [
      {
        title: "Local Cuisine",
        content: "Rice and curry is staple. Try hoppers (appam), kottu roti, string hoppers, and fresh seafood. Spicy food is common - ask for 'mild' if sensitive. Fresh fruits are excellent and safe."
      },
      {
        title: "Food Safety",
        content: "Eat at busy restaurants with high turnover. Avoid raw salads and unpeeled fruits from street vendors. Drink bottled or filtered water. Ice is generally safe in tourist areas. Trust your instincts."
      },
      {
        title: "Dietary Restrictions",
        content: "Vegetarian options widely available. Many Buddhists are vegetarian. Halal food available in Muslim areas. Vegan options can be found. Inform restaurants of allergies clearly."
      },
      {
        title: "Meal Times",
        content: "Breakfast: 7-9 AM, Lunch: 12-2 PM, Dinner: 7-9 PM. Many restaurants close between 2-6 PM. Street food available throughout the day. Tea time is important (4-5 PM)."
      }
    ]
  },
  {
    category: "Health & Safety",
    icon: AlertCircle,
    color: "bg-yellow-500/10 text-yellow-600",
    tips: [
      {
        title: "Water",
        content: "Drink bottled or filtered water. Avoid tap water. Ice generally safe in tourist areas. Use bottled water for brushing teeth if unsure. Carry water bottle and refill from trusted sources."
      },
      {
        title: "Sun Protection",
        content: "Strong sun year-round. Use high SPF sunscreen (30+), wear hat and sunglasses. Seek shade during midday (11 AM - 3 PM). Stay hydrated."
      },
      {
        title: "Mosquito Protection",
        content: "Use insect repellent, especially in evenings. Dengue and malaria risk in some areas. Consider mosquito nets. Wear long sleeves/pants at dawn and dusk."
      },
      {
        title: "Medical Facilities",
        content: "Good hospitals in Colombo and major cities. Private hospitals recommended for tourists. Pharmacies widely available. Bring prescription medications. Travel insurance essential."
      }
    ]
  },
  {
    category: "Shopping & Souvenirs",
    icon: Camera,
    color: "bg-indigo-500/10 text-indigo-600",
    tips: [
      {
        title: "What to Buy",
        content: "Ceylon tea, spices, gemstones (buy from certified dealers), batik, handloom textiles, wooden masks, traditional crafts. Colombo has best shopping, but local markets offer authentic items."
      },
      {
        title: "Bargaining",
        content: "Expected in markets and with tuk-tuk drivers. Start at 50-60% of asking price. Be polite and friendly. Fixed prices in malls and supermarkets. Don't bargain aggressively."
      },
      {
        title: "Gemstones",
        content: "Sri Lanka famous for sapphires, rubies, and other gems. Only buy from government-certified dealers. Get certificates. Be cautious of scams. Research before buying expensive items."
      }
    ]
  }
];

const quickFacts = [
  { label: "Capital", value: "Colombo / Sri Jayawardenepura Kotte", icon: Building2 },
  { label: "Population", value: "~22 million", icon: Globe },
  { label: "Languages", value: "Sinhala, Tamil, English", icon: Globe },
  { label: "Religion", value: "Buddhism (70%), Hinduism, Islam, Christianity", icon: Heart },
  { label: "Time Zone", value: "IST (UTC+5:30)", icon: Clock },
  { label: "Electricity", value: "230V, 50Hz (Type D, G plugs)", icon: Zap },
  { label: "Country Code", value: "+94", icon: Phone },
  { label: "Internet Domain", value: ".lk", icon: Globe }
];

const reminders = [
  "Keep copies of important documents (passport, visa, insurance) separate from originals",
  "Register with your embassy if staying for extended periods",
  "Respect local customs and traditions - Sri Lankans are very welcoming and appreciate respectful visitors",
  "Carry cash for emergencies - not all places accept cards",
  "Download offline maps and translation apps before arrival",
  "Be flexible - things may not always go as planned, but that's part of the adventure!"
];

export default function TravelTipsPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const remindersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Quick Facts animation
      if (factsRef.current) {
        const items = factsRef.current.children;
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: factsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Categories animation
      if (categoriesRef.current) {
        const cards = categoriesRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Reminders animation
      if (remindersRef.current) {
        gsap.fromTo(
          remindersRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: remindersRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Travel Tips & Guide
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Everything you need to know for a smooth and enjoyable trip to Sri Lanka
          </p>
        </div>

        {/* Quick Facts */}
        <div ref={factsRef} className="mb-16">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Quick Facts About Sri Lanka
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {fact.label}
                      </p>
                    </div>
                    <p className="text-base font-semibold text-foreground leading-relaxed">
                      {fact.value}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Travel Tips by Category */}
        <div ref={categoriesRef} className="space-y-6 mb-16">
          {travelTips.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card 
                key={categoryIndex} 
                className="border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <CardHeader className="bg-gradient-to-r from-background to-muted/30 border-b">
                  <CardTitle className="flex items-center gap-4">
                    <div className={`rounded-xl ${category.color} p-3`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {category.category}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.tips.length} essential tips
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {category.tips.map((tip, tipIndex) => (
                      <AccordionItem 
                        key={tipIndex} 
                        value={`item-${categoryIndex}-${tipIndex}`}
                        className="border-b border-border/50"
                      >
                        <AccordionTrigger className="text-left font-semibold text-lg py-4 hover:no-underline hover:text-primary transition-colors">
                          {tip.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-4">
                          <p className="whitespace-pre-line">{tip.content}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Important Reminders */}
        <div ref={remindersRef} className="mb-16">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground">
                  Important Reminders
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {reminders.map((reminder, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/50 hover:bg-background transition-colors">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-foreground leading-relaxed">{reminder}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-background to-accent/10">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
                Ready to Plan Your Trip?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions or need personalized advice? Get in touch with us!
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/tours">
                    View Tours
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
