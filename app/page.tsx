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
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Destinations />
            </div>
            <div className="lg:col-span-1">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
      <ThingsToDo />
      <TravelStories />
      <Testimonials />
      
      {/* Helpful Tools Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Helpful Travel Tools
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Essential resources to help you plan your perfect Sri Lanka adventure
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Destinations
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Explore all the amazing places Sri Lanka has to offer
                </p>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="/destinations">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Tours & Packages
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Curated itineraries for every type of traveler
                </p>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="/tours">
                    View Tours <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Travel Tips
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Everything you need to know before your trip
                </p>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="/travel-tips">
                    Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 rounded-lg bg-primary/10 p-3 w-fit">
                  <HelpCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  FAQ
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Answers to common questions about visiting Sri Lanka
                </p>
                <Button asChild variant="ghost" className="group-hover:text-primary">
                  <Link href="#faq">
                    View FAQ <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Currency Converter */}
          <div className="mt-12">
            <div className="mx-auto max-w-md">
              <CurrencyConverter />
            </div>
          </div>
        </div>
      </section>

      <FAQ />
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-deep text-white">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to Start Your Sri Lanka Adventure?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Let&apos;s create a customized itinerary that perfectly matches your interests, 
            budget, and travel style. Get in touch today!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Plan Your Trip
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/tours">View Tour Packages</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
