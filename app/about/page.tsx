import type { Metadata } from "next";
import Link from "next/link";
import { GuideImage } from "@/components/ui/GuideImage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  MapPin, 
  Heart, 
  Shield, 
  Star, 
  CheckCircle2,
  Languages,
  Calendar,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import { generatePageMetadata, SITE_URL, TARGET_COUNTRIES } from "@/lib/seo";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/structured-data";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = generatePageMetadata({
  title: "About Us - Professional Sri Lanka Tour Guide | Easy Tripper",
  description: "Learn about Easy Tripper and Jagath Premasinghe, your expert local guide in Sri Lanka. With 10+ years of experience, we offer personalized tours, cultural experiences, and luxury transportation services. Serving travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
  keywords: [
    "about Easy Tripper",
    "Sri Lanka tour guide",
    "Jagath Premasinghe",
    "professional tour guide Sri Lanka",
    "local guide Sri Lanka",
    "Sri Lanka travel expert",
    "certified tour guide",
    "Sri Lanka tour operator",
    "experienced guide Sri Lanka",
    "Sri Lanka travel services",
  ],
  path: "/about",
  image: "/images/og-image.jpg",
  targetCountries: TARGET_COUNTRIES.map((c) => c.code),
});

export default function AboutPage() {
  const languages = [
    { name: "English", level: "Fluent", flag: "🇬🇧" },
    { name: "Sinhala", level: "Native", flag: "🇱🇰" },
    { name: "Tamil", level: "Fluent", flag: "🇱🇰" },
    { name: "French", level: "Basic", flag: "🇫🇷" },
    { name: "German", level: "Basic", flag: "🇩🇪" },
  ];

  const values = [
    {
      icon: Heart,
      title: "Authentic Experiences",
      description: "We believe in showing you the real Sri Lanka - from hidden gems to local traditions, ensuring authentic cultural immersion.",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety and comfort are our top priorities. We maintain high standards for vehicles, guides, and tour planning.",
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Every tour is customized to your interests, budget, and travel style. No cookie-cutter itineraries.",
    },
    {
      icon: Star,
      title: "Excellence",
      description: "With 10+ years of experience and thousands of satisfied travelers, we're committed to delivering exceptional service.",
    },
  ];

  const services = [
    "Custom Tour Planning & Itinerary Design",
    "Private Tour Guide Services",
    "Luxury Vehicle & Chauffeur Services",
    "Airport Transfer & Transportation",
    "Cultural Heritage Tours",
    "Wildlife Safari Tours",
    "Beach & Coastal Tours",
    "Hill Country & Tea Plantation Tours",
    "Adventure & Outdoor Activities",
    "Photography Tours",
  ];

  const stats = [
    { label: "Years of Experience", value: "10+" },
    { label: "Tours Conducted", value: "500+" },
    { label: "Happy Travelers", value: "5000+" },
    { label: "Languages Spoken", value: "5" },
  ];

  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <PersonSchema />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <Breadcrumbs items={[
              { name: "About Us", url: "/about" }
            ]} />
            
            <div className="text-center mt-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                About Easy Tripper
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Your Trusted Guide to Exploring the Beauty of Sri Lanka
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Welcome to Easy Tripper
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-lg">
                    Easy Tripper is a premier tour guide service in Sri Lanka, founded in 2020 by 
                    <strong className="text-foreground"> Jagath Premasinghe</strong>, a certified 
                    professional tour guide with over 10 years of experience exploring every corner 
                    of this beautiful island.
                  </p>
                  <p>
                    We specialize in creating personalized, authentic travel experiences that showcase 
                    the best of Sri Lanka - from ancient UNESCO World Heritage sites to pristine beaches, 
                    misty mountain peaks to wildlife-rich national parks.
                  </p>
                  <p>
                    Our mission is to provide travelers from around the world with unforgettable journeys 
                    through Sri Lanka, combining expert local knowledge, cultural insights, and genuine 
                    hospitality. We serve travelers from India, Switzerland, Netherlands, Germany, Sweden, 
                    and beyond.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guide Profile */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Meet Your Guide
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Jagath Premasinghe - Your Expert Local Guide & Cultural Ambassador
              </p>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Guide Image */}
                  <div className="md:col-span-1">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                      <GuideImage
                        src="/images/guide/jagath-premasinghe.jpg"
                        alt="Jagath Premasinghe - Professional Tour Guide in Sri Lanka"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Badge className="bg-primary text-white mb-2">
                        <Award className="h-4 w-4 mr-2" />
                        Certified Guide
                      </Badge>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-foreground">5.0 Rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Guide Info */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Jagath Premasinghe
                      </h3>
                      <p className="text-lg text-primary font-semibold mb-4">
                        Professional Tour Guide & Cultural Ambassador
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Hi, I&apos;m Jagath Premasinghe 👋 With a passion for exploring the beauty and 
                        culture of Sri Lanka, I strive to provide an unforgettable experience for all my 
                        guests. Whether you&apos;re here for the lush landscapes, the rich heritage, or 
                        the pristine beaches, I&apos;ll guide you through the hidden gems of our island.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        With over 10 years of experience guiding tours across Sri Lanka, I specialize in 
                        cultural heritage and eco-tourism. I&apos;ve conducted hundreds of tours, helping 
                        thousands of travelers from around the world discover the authentic beauty of Sri Lanka.
                      </p>
                    </div>

                    {/* Languages */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Languages className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">Languages I Speak</h4>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {languages.map((lang) => (
                          <Badge key={lang.name} variant="secondary" className="text-sm">
                            <span className="mr-2">{lang.flag}</span>
                            {lang.name} ({lang.level})
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Experience Highlights */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">10+ Years Experience</p>
                          <p className="text-sm text-muted-foreground">Guiding tours across Sri Lanka</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground">500+ Tours Conducted</p>
                          <p className="text-sm text-muted-foreground">From coast to mountains</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Values & Commitment
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                What sets us apart in delivering exceptional travel experiences
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tour and transportation services across Sri Lanka
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Easy Tripper?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Local Expertise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Born and raised in Sri Lanka, I have intimate knowledge of the island&apos;s 
                    hidden gems, local customs, and best-kept secrets that you won&apos;t find in 
                    guidebooks.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Insider access to local communities and experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Deep understanding of Sri Lankan culture and history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Knowledge of best times to visit attractions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Personalized Service
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every tour is tailored to your interests, pace, and preferences. We don&apos;t 
                    believe in one-size-fits-all itineraries.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Custom itinerary planning based on your interests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Flexible scheduling and tour modifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">24/7 support during your tour</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Quality & Safety
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We maintain the highest standards for vehicles, guides, and tour planning to 
                    ensure your safety and comfort.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Well-maintained, modern vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Licensed and insured operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Professional, certified guides</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    International Experience
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We&apos;ve welcomed travelers from around the world, including India, Switzerland, 
                    Netherlands, Germany, and Sweden.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Multilingual communication (5 languages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Understanding of different cultural preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Experience with international travelers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Explore Sri Lanka?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s create your perfect Sri Lanka adventure together. Contact us today to 
              start planning your personalized tour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/tours">
                  View Our Tours
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Get in Touch</h3>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="tel:+94756433267" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-5 w-5" />
                  <span>+94 75 643 3267</span>
                </a>
                <a href="mailto:hello@easytripper.lk" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>hello@easytripper.lk</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
