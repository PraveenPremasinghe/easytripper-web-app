import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Info
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Travel Tips & Guide",
  description: "Essential travel information and tips for visiting Sri Lanka - visa, currency, culture, and more",
};

const travelTips = [
  {
    category: "Before You Go",
    icon: Plane,
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
  { label: "Capital", value: "Colombo / Sri Jayawardenepura Kotte" },
  { label: "Population", value: "~22 million" },
  { label: "Languages", value: "Sinhala, Tamil, English" },
  { label: "Religion", value: "Buddhism (70%), Hinduism, Islam, Christianity" },
  { label: "Time Zone", value: "IST (UTC+5:30)" },
  { label: "Electricity", value: "230V, 50Hz (Type D, G plugs)" },
  { label: "Country Code", value: "+94" },
  { label: "Internet Domain", value: ".lk" }
];

export default function TravelTipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Travel Tips & Guide
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to know for a smooth and enjoyable trip to Sri Lanka
          </p>
        </div>

        {/* Quick Facts */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Quick Facts About Sri Lanka
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickFacts.map((fact, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{fact.label}</p>
                  <p className="text-sm text-muted-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Travel Tips by Category */}
        <div className="space-y-8">
          {travelTips.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.tips.map((tip, tipIndex) => (
                      <AccordionItem key={tipIndex} value={`item-${categoryIndex}-${tipIndex}`}>
                        <AccordionTrigger className="text-left font-semibold">
                          {tip.title}
                        </AccordionTrigger>
                        <AccordionContent className="text-foreground">
                          {tip.content}
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
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Important Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Keep copies of important documents (passport, visa, insurance) separate from originals</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Register with your embassy if staying for extended periods</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Respect local customs and traditions - Sri Lankans are very welcoming and appreciate respectful visitors</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Carry cash for emergencies - not all places accept cards</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Download offline maps and translation apps before arrival</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>Be flexible - things may not always go as planned, but that&apos;s part of the adventure!</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Ready to Plan Your Trip?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Have questions or need personalized advice? Get in touch with us!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Contact Us
              </a>
              <a
                href="/tours"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                View Tours
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

