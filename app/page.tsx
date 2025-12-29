import { Hero } from "@/components/hero/Hero";
import { AboutSriLanka } from "@/components/sections/AboutSriLanka";
import { AboutMe } from "@/components/sections/AboutMe";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Destinations } from "@/components/sections/Destinations";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { ThingsToDo } from "@/components/sections/ThingsToDo";
import { TravelStories } from "@/components/sections/TravelStories";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CurrencyConverter } from "@/components/ui/currency-converter";
import { LocalBusinessSchema, TouristTripSchemas, FAQSchema } from "@/components/seo/structured-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Calendar, BookOpen, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <>
      <LocalBusinessSchema />
      <TouristTripSchemas />
      <FAQSchema />
      <Hero />
      <AboutSriLanka />
      <AboutMe />
      <WhyChooseUs />
      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Destinations />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ThingsToDo />
      <TravelStories />
      <Testimonials />
      
      {/* Helpful Tools Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl font-serif">
              Helpful Travel Tools
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Essential resources to help you plan your perfect Sri Lanka adventure
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 rounded-2xl bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground font-serif">
                  Destinations
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Explore all the amazing places Sri Lanka has to offer
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent group-hover:text-primary transition-colors text-sm font-medium">
                  <Link href="/destinations" className="flex items-center">
                    Explore <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 rounded-2xl bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground font-serif">
                  Tours & Packages
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Curated itineraries for every type of traveler
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent group-hover:text-primary transition-colors text-sm font-medium">
                  <Link href="/tours" className="flex items-center">
                    View Tours <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 rounded-2xl bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground font-serif">
                  Travel Tips
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Everything you need to know before your trip
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent group-hover:text-primary transition-colors text-sm font-medium">
                  <Link href="/travel-tips" className="flex items-center">
                    Read Guide <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 rounded-2xl bg-primary/10 p-3 w-fit group-hover:bg-primary/20 transition-colors">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground font-serif">
                  FAQ
                </h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Answers to common questions about visiting Sri Lanka
                </p>
                <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent group-hover:text-primary transition-colors text-sm font-medium">
                  <Link href="#faq" className="flex items-center">
                    View FAQ <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Currency Converter */}
          <div className="mt-16">
            <div className="mx-auto max-w-md">
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      
      {/* Final CTA Section */}
      <section className="py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8 relative z-10">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight font-serif">
            Ready to Start Your Sri Lanka Adventure?
          </h2>
          <p className="mb-10 text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s create a customized itinerary that perfectly matches your interests, 
            budget, and travel style. Get in touch today!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
              <Link href="/contact">
                Plan Your Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all w-full sm:w-auto">
              <Link href="/tours">View Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
