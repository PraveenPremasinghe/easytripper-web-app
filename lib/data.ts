import { Destination, Story, Testimonial, FAQ, ThingToDo, Tour, TopTravelPlace } from "./types";

export const destinations: Destination[] = [
  {
    slug: "kandy",
    name: "Kandy",
    region: "Central",
    excerpt: "The cultural capital with the sacred Temple of the Tooth",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Temple of the Tooth", "Royal Botanical Gardens", "Kandy Lake", "Cultural shows"],
    description: "Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings' era of Sri Lanka. The city lies in the midst of hills in the Kandy plateau, which crosses an area of tropical plantations, mainly tea.",
    bestTime: "December to April",
    duration: "2-3 days"
  },
  {
    slug: "ella",
    name: "Ella",
    region: "Uva",
    excerpt: "Mountain paradise with stunning views and hiking trails",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    highlights: ["Nine Arch Bridge", "Ella Rock", "Little Adam's Peak", "Tea plantations"],
    description: "Ella is a small town in the Badulla District of Uva Province, situated in the highlands at an elevation of 1,041 metres above sea level. The area has a rich bio-diversity, dense with numerous varieties of flora and fauna.",
    bestTime: "December to March",
    duration: "2-3 days"
  },
  {
    slug: "sigiriya",
    name: "Sigiriya",
    region: "Central",
    excerpt: "Ancient rock fortress and UNESCO World Heritage Site",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Lion Rock Fortress", "Ancient frescoes", "Water gardens", "Pidurangala Rock"],
    description: "Sigiriya is an ancient rock fortress located in the northern Matale District near the town of Dambulla. It is a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres high.",
    bestTime: "December to April",
    duration: "1 day"
  },
  {
    slug: "galle",
    name: "Galle",
    region: "Southern",
    excerpt: "Colonial fort city by the sea",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    highlights: ["Galle Fort", "Dutch architecture", "Beaches", "Lighthouse"],
    description: "Galle is a major city in Sri Lanka, situated on the southwestern tip, 119 km from Colombo. Galle is the administrative capital of Southern Province, Sri Lanka and is the district capital of Galle District.",
    bestTime: "November to April",
    duration: "2-3 days"
  },
  {
    slug: "yala",
    name: "Yala National Park",
    region: "Southern",
    excerpt: "Premier wildlife sanctuary with leopards and elephants",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    highlights: ["Leopard sightings", "Elephant herds", "Bird watching", "Safari tours"],
    description: "Yala National Park is the most visited and second largest national park in Sri Lanka. The park consists of five blocks, two of which are now open to the public, and also adjoining parks.",
    bestTime: "February to July",
    duration: "1-2 days"
  },
  {
    slug: "jaffna",
    name: "Jaffna",
    region: "Northern",
    excerpt: "Cultural hub of the Tamil north",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Jaffna Fort", "Nallur Temple", "Casuarina Beach", "Local cuisine"],
    description: "Jaffna is the capital city of the Northern Province of Sri Lanka. It is the administrative headquarters of the Jaffna District located on a peninsula of the same name.",
    bestTime: "December to March",
    duration: "2-3 days"
  },
  {
    slug: "anuradhapura",
    name: "Anuradhapura",
    region: "North Central",
    excerpt: "Ancient capital with sacred Buddhist sites",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Sacred Bodhi Tree", "Ancient stupas", "Ruwanwelisaya", "Abhayagiri Monastery"],
    description: "Anuradhapura is a major city located in north central plain of Sri Lanka. It is the capital city of North Central Province and the capital of Anuradhapura District.",
    bestTime: "December to April",
    duration: "1-2 days"
  },
  {
    slug: "polonnaruwa",
    name: "Polonnaruwa",
    region: "North Central",
    excerpt: "Medieval capital with well-preserved ruins",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    highlights: ["Ancient ruins", "Gal Vihara", "Royal Palace", "Archaeological Museum"],
    description: "Polonnaruwa is the main town of Polonnaruwa District in North Central Province, Sri Lanka. The modern town of Polonnaruwa is also known as New Town, and the other part of Polonnaruwa remains as the royal ancient city of the Kingdom of Polonnaruwa.",
    bestTime: "December to April",
    duration: "1-2 days"
  },
  {
    slug: "mirissa",
    name: "Mirissa",
    region: "Southern",
    excerpt: "Beach paradise for whale watching and surfing",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    highlights: ["Whale watching", "Surfing", "Beach bars", "Coconut Tree Hill"],
    description: "Mirissa is a small town on the south coast of Sri Lanka, located in the Matara District of the Southern Province. It is approximately 150 kilometres south of Colombo and is situated at an elevation of 4 metres above sea level.",
    bestTime: "November to April",
    duration: "2-3 days"
  },
  {
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    region: "Central",
    excerpt: "Little England with tea estates and cool climate",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    highlights: ["Tea plantations", "Gregory Lake", "Hakgala Gardens", "Horse racing"],
    description: "Nuwara Eliya is a city in the hill country of the Central Province, Sri Lanka. Its name means 'city on the plain' or 'city of light'. The city is the administrative capital of Nuwara Eliya District.",
    bestTime: "March to May",
    duration: "2-3 days"
  }
];

export interface Vehicle {
  id: string;
  name: string;
  type: "Car" | "Van" | "Bus" | "Jeep";
  capacity: {
    passengers: number;
    luggage: number;
  };
  features: string[];
  image: string;
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "luxury-sedan",
    name: "Luxury Sedan (Prius/Axio)",
    type: "Car",
    capacity: { passengers: 3, luggage: 2 },
    features: ["Air Conditioned", "Bluetooth Audio", "Comfortable Seating", "WiFi on board"],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    description: "Perfect for couples or small families. Enjoy a smooth and comfortable ride through Sri Lanka's scenic roads."
  },
  {
    id: "luxury-van",
    name: "Luxury KDH Van",
    type: "Van",
    capacity: { passengers: 7, luggage: 6 },
    features: ["Dual A/C", "Adjustable Seats", "Ample Leg Room", "Tinted Windows"],
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&h=600&fit=crop",
    description: "Ideal for families and small groups. Spacious interiors ensure a relaxing journey even on long trips."
  },
  {
    id: "mini-coach",
    name: "Tourist Mini Coach",
    type: "Bus",
    capacity: { passengers: 15, luggage: 12 },
    features: ["Microphone", "Reclining Seats", "Overhead Racks", "Panoramic Windows"],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop",
    description: "The best choice for larger tour groups. Travel together comfortably with plenty of space for everyone."
  },
  {
    id: "safari-jeep",
    name: "4x4 Safari Jeep",
    type: "Jeep",
    capacity: { passengers: 6, luggage: 0 },
    features: ["4 Wheel Drive", "Open Top / Canopy", "Elevated Views", "Experienced Tracker"],
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&h=600&fit=crop",
    description: "Rugged and ready for adventure. Essential for navigating Yala, Udawalawe, and other national parks."
  }
];

export const stories: Story[] = [
  {
    id: "1",
    title: "Cultural Triangle Adventure",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    tags: ["Culture", "History", "Temples"],
    excerpt: "Exploring the ancient cities of Anuradhapura, Polonnaruwa, and Sigiriya",
    date: "March 2024"
  },
  {
    id: "2",
    title: "Hill Country Journey",
    cover: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["Nature", "Mountains", "Tea"],
    excerpt: "From Kandy to Ella through misty mountains and tea plantations",
    date: "January 2024"
  },
  {
    id: "3",
    title: "Wildlife Safari Experience",
    cover: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop"
    ],
    tags: ["Wildlife", "Safari", "Yala"],
    excerpt: "Spotting leopards, elephants, and exotic birds in Yala National Park",
    date: "February 2024"
  },
  {
    id: "4",
    title: "Coastal Paradise",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
    ],
    tags: ["Beaches", "Galle", "History"],
    excerpt: "Discovering the colonial charm of Galle and pristine southern beaches",
    date: "December 2023"
  },
  {
    id: "5",
    title: "Northern Exploration",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
    ],
    tags: ["Culture", "Jaffna", "Temples"],
    excerpt: "Immersing in the unique Tamil culture and cuisine of Jaffna",
    date: "November 2023"
  },
  {
    id: "6",
    title: "Whale Watching Adventure",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
    ],
    tags: ["Wildlife", "Mirissa", "Ocean"],
    excerpt: "Witnessing majestic blue whales off the coast of Mirissa",
    date: "April 2024"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    country: "United States",
    rating: 5,
    comment: "Jagath made our Sri Lanka trip absolutely unforgettable! His knowledge of the culture and history is incredible, and he went above and beyond to ensure we had the best experience. Highly recommend!",
    tripRoute: "Colombo → Kandy → Ella → Yala → Galle"
  },
  {
    id: "2",
    name: "Michael Chen",
    country: "Australia",
    rating: 5,
    comment: "Professional, friendly, and incredibly knowledgeable. Jagath showed us hidden gems we never would have found on our own. The perfect guide for exploring Sri Lanka!",
    tripRoute: "Sigiriya → Polonnaruwa → Anuradhapura"
  },
  {
    id: "3",
    name: "Emma Williams",
    country: "United Kingdom",
    rating: 5,
    comment: "Our family trip was made so much easier with Jagath's expertise. He understood exactly what we needed and created the perfect itinerary. The kids loved every moment!",
    tripRoute: "Kandy → Nuwara Eliya → Ella"
  },
  {
    id: "4",
    name: "David Martinez",
    country: "Spain",
    rating: 5,
    comment: "Jagath is not just a guide, he's a true ambassador for Sri Lanka. His passion for his country is infectious, and his English is perfect. We felt safe and well taken care of throughout.",
    tripRoute: "Colombo → Galle → Mirissa → Yala"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    country: "Canada",
    rating: 5,
    comment: "The best travel experience we've had! Jagath's attention to detail and personalized service exceeded all expectations. We'll definitely be back and will only use his services.",
    tripRoute: "Cultural Triangle → Hill Country"
  },
  {
    id: "6",
    name: "James Taylor",
    country: "New Zealand",
    rating: 5,
    comment: "Outstanding guide with deep local knowledge. Jagath made sure we experienced authentic Sri Lankan culture, food, and hospitality. Worth every penny!",
    tripRoute: "Jaffna → Anuradhapura → Kandy"
  }
];

export const faqs: FAQ[] = [
  {
    q: "Do I need a visa to visit Sri Lanka?",
    a: "Yes, most visitors need a visa. You can apply for an Electronic Travel Authorization (ETA) online before your trip, or get a visa on arrival. The ETA is valid for 30 days and can be extended. Check the official Sri Lanka immigration website for the most current requirements based on your nationality."
  },
  {
    q: "What is the best time to visit Sri Lanka?",
    a: "Sri Lanka has two monsoon seasons, so there's always a good time to visit somewhere! The west and south coasts are best from December to March, while the east coast is best from April to September. The hill country is pleasant year-round, though it can be cooler from December to February. Generally, December to April is considered peak season for most regions."
  },
  {
    q: "Is Sri Lanka safe for tourists?",
    a: "Yes, Sri Lanka is generally very safe for tourists. The country is peaceful and welcoming to visitors. As with any travel destination, exercise normal precautions: be aware of your surroundings, don't leave valuables unattended, and follow local advice. The people are known for their hospitality and friendliness."
  },
  {
    q: "What are the typical costs for a trip to Sri Lanka?",
    a: "Sri Lanka offers great value for money. Budget travelers can get by on $30-50 USD per day, mid-range travelers $50-100 USD, and luxury travelers $150+ USD per day. This includes accommodation, food, transport, and activities. Local food is very affordable, while international restaurants cost more."
  },
  {
    q: "How do I get a SIM card and internet access?",
    a: "You can easily get a SIM card at the airport or from local providers (Dialog, Mobitel, Hutch) in any city. Tourist SIM cards with data packages are available for around $5-10 USD. 4G coverage is good in most tourist areas. Many hotels and cafes also offer free WiFi."
  },
  {
    q: "Should I use cash or cards?",
    a: "Both are accepted, but cash (Sri Lankan Rupees) is more widely used, especially in smaller towns and local establishments. Credit cards are accepted in hotels, larger restaurants, and shops in cities. ATMs are readily available in cities and tourist areas. It's good to carry some cash for small purchases, tips, and rural areas."
  },
  {
    q: "What should I wear in Sri Lanka?",
    a: "Lightweight, breathable clothing is best due to the tropical climate. When visiting temples and religious sites, cover your shoulders and knees (both men and women). Remove shoes and hats before entering temples. Beachwear is fine at the beach, but cover up when leaving. A light jacket is useful for the hill country where it can be cooler."
  },
  {
    q: "How do I get around Sri Lanka?",
    a: "Options include private drivers/guides (most convenient for tourists), trains (scenic, especially the hill country routes), buses (cheap but crowded), and domestic flights (for longer distances). Many visitors hire a driver for the duration of their trip, which offers flexibility and local knowledge. Tuk-tuks are great for short distances in cities."
  },
  {
    q: "What vaccinations do I need?",
    a: "No mandatory vaccinations are required for Sri Lanka, but it's recommended to be up to date on routine vaccines. Hepatitis A and Typhoid are recommended. Consult with your doctor or a travel clinic 4-6 weeks before your trip for personalized advice based on your health and itinerary."
  },
  {
    q: "What is the local currency and exchange rate?",
    a: "The currency is the Sri Lankan Rupee (LKR). Exchange rates fluctuate, but approximately 1 USD = 300-330 LKR (check current rates). You can exchange money at the airport, banks, or authorized money changers. Keep receipts for currency exchange as you may need them when converting back."
  }
];

export const thingsToDo: ThingToDo[] = [
  // Culture
  {
    id: "1",
    title: "Temple of the Tooth Relic",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Visit the most sacred Buddhist temple in Sri Lanka, housing the tooth relic of Lord Buddha.",
    location: "Kandy"
  },
  {
    id: "2",
    title: "Ancient City of Anuradhapura",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Explore the ruins of the first capital of Sri Lanka, a UNESCO World Heritage Site.",
    location: "Anuradhapura"
  },
  {
    id: "3",
    title: "Galle Fort Walking Tour",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop3.jpg",
    description: "Stroll through the well-preserved Dutch colonial fort with its charming architecture.",
    location: "Galle"
  },
  {
    id: "4",
    title: "Traditional Kandyan Dance Show",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop4.jpg",
    description: "Watch vibrant traditional dance performances showcasing Sri Lankan culture.",
    location: "Kandy"
  },
  // Nature
  {
    id: "5",
    title: "Hike to Ella Rock",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop5.jpg",
    description: "Trek through tea plantations to reach stunning panoramic views of the hill country.",
    location: "Ella"
  },
  {
    id: "6",
    title: "Royal Botanical Gardens",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop6.jpg",
    description: "Wander through 147 acres of beautifully landscaped gardens with exotic plants.",
    location: "Kandy"
  },
  {
    id: "7",
    title: "Sinharaja Rainforest",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop7.jpg",
    description: "Explore the last remaining primary rainforest in Sri Lanka, a biodiversity hotspot.",
    location: "Ratnapura"
  },
  {
    id: "8",
    title: "Tea Plantation Tour",
    category: "Nature",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop8.jpg",
    description: "Learn about tea production and enjoy fresh Ceylon tea in the highlands.",
    location: "Nuwara Eliya"
  },
  // Beaches
  {
    id: "9",
    title: "Unawatuna Beach",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop9.jpg",
    description: "Relax on this beautiful crescent-shaped beach with calm waters perfect for swimming.",
    location: "Galle"
  },
  {
    id: "10",
    title: "Arugam Bay Surfing",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop10.jpg",
    description: "Ride the waves at one of Asia's best surf spots with consistent breaks.",
    location: "Arugam Bay"
  },
  {
    id: "11",
    title: "Mirissa Beach",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop11.jpg",
    description: "Enjoy golden sands, palm trees, and excellent whale watching opportunities.",
    location: "Mirissa"
  },
  // Wildlife
  {
    id: "12",
    title: "Yala National Park Safari",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop12.jpg",
    description: "Spot leopards, elephants, and diverse birdlife on an exciting jeep safari.",
    location: "Yala"
  },
  {
    id: "13",
    title: "Udawalawe Elephant Transit Home",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop13.jpg",
    description: "Watch orphaned elephants being fed and prepared for release back into the wild.",
    location: "Udawalawe"
  },
  {
    id: "14",
    title: "Whale Watching Tour",
    category: "Wildlife",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop14.jpg",
    description: "See blue whales, sperm whales, and dolphins in their natural habitat.",
    location: "Mirissa"
  },
  // Food
  {
    id: "15",
    title: "Cooking Class in Kandy",
    category: "Food",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop15.jpg",
    description: "Learn to prepare authentic Sri Lankan curries and traditional dishes.",
    location: "Kandy"
  },
  {
    id: "16",
    title: "Street Food Tour in Colombo",
    category: "Food",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop16.jpg",
    description: "Sample local favorites like hoppers, kottu roti, and fresh fruit.",
    location: "Colombo"
  },
  {
    id: "17",
    title: "Jaffna Food Experience",
    category: "Food",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop17.jpg",
    description: "Taste unique Tamil cuisine including crab curry and traditional sweets.",
    location: "Jaffna"
  }
];

export const tours: Tour[] = [
  {
    id: "classic-7-day",
    name: "Classic Sri Lanka - 7 Days",
    duration: "7 Days / 6 Nights",
    price: "From $899",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    description: "Experience the best of Sri Lanka in this comprehensive tour covering ancient cities, hill country, and wildlife.",
    highlights: [
      "Visit UNESCO World Heritage Sites",
      "Scenic train journey through tea country",
      "Wildlife safari in Yala National Park",
      "Explore colonial Galle Fort",
      "Traditional Kandyan dance show"
    ],
    itinerary: [
      "Day 1: Arrival in Colombo → Kandy",
      "Day 2: Kandy (Temple of the Tooth, Botanical Gardens)",
      "Day 3: Kandy → Nuwara Eliya (Tea plantations, train journey)",
      "Day 4: Nuwara Eliya → Ella (Hiking, Nine Arch Bridge)",
      "Day 5: Ella → Yala (Safari tour)",
      "Day 6: Yala → Galle (Beach time, fort exploration)",
      "Day 7: Galle → Colombo (Departure)"
    ],
    includes: [
      "Accommodation (3-4 star hotels)",
      "Private vehicle with driver/guide",
      "All entrance fees",
      "Breakfast daily",
      "Yala safari jeep",
      "Train tickets (Kandy to Ella)"
    ],
    excludes: [
      "International flights",
      "Lunch and dinner",
      "Personal expenses",
      "Tips and gratuities"
    ],
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Yala", "Galle"],
    category: "Classic",
    difficulty: "Easy",
    groupSize: "2-8 people",
    bestTime: "December to April"
  },
  {
    id: "cultural-triangle",
    name: "Cultural Triangle Adventure",
    duration: "5 Days / 4 Nights",
    price: "From $649",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Discover the ancient heritage of Sri Lanka through the Cultural Triangle, visiting sacred sites and ancient capitals.",
    highlights: [
      "Sigiriya Rock Fortress",
      "Ancient city of Anuradhapura",
      "Medieval capital Polonnaruwa",
      "Dambulla Cave Temple",
      "Sacred Bodhi Tree"
    ],
    itinerary: [
      "Day 1: Airport → Anuradhapura",
      "Day 2: Anuradhapura (Full day exploration)",
      "Day 3: Anuradhapura → Polonnaruwa → Sigiriya",
      "Day 4: Sigiriya (Rock climb, Dambulla caves)",
      "Day 5: Sigiriya → Airport"
    ],
    includes: [
      "Accommodation (3-4 star hotels)",
      "Private vehicle with guide",
      "All entrance fees",
      "Breakfast daily",
      "Local guide at archaeological sites"
    ],
    destinations: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Dambulla"],
    category: "Cultural",
    difficulty: "Moderate",
    groupSize: "2-6 people",
    bestTime: "December to April"
  },
  {
    id: "wildlife-safari",
    name: "Wildlife & Nature Safari",
    duration: "6 Days / 5 Nights",
    price: "From $799",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    description: "Perfect for nature lovers and wildlife enthusiasts. Spot leopards, elephants, and exotic birds in their natural habitat.",
    highlights: [
      "Yala National Park safari (2 days)",
      "Udawalawe Elephant Transit Home",
      "Sinharaja Rainforest trek",
      "Bird watching tours",
      "Whale watching (seasonal)"
    ],
    itinerary: [
      "Day 1: Airport → Yala",
      "Day 2: Yala (Morning & evening safaris)",
      "Day 3: Yala → Udawalawe → Sinharaja",
      "Day 4: Sinharaja (Rainforest exploration)",
      "Day 5: Sinharaja → Mirissa (Whale watching)",
      "Day 6: Mirissa → Airport"
    ],
    includes: [
      "Accommodation (3-4 star hotels)",
      "Private vehicle with naturalist guide",
      "All safari jeeps and entrance fees",
      "Breakfast daily",
      "Whale watching boat trip"
    ],
    destinations: ["Yala", "Udawalawe", "Sinharaja", "Mirissa"],
    category: "Wildlife",
    difficulty: "Moderate",
    groupSize: "2-6 people",
    bestTime: "February to July (Yala), November to April (Whales)"
  },
  {
    id: "beach-paradise",
    name: "Beach Paradise Tour",
    duration: "8 Days / 7 Nights",
    price: "From $999",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    description: "Relax and unwind on Sri Lanka's pristine beaches while exploring coastal culture and water activities.",
    highlights: [
      "Multiple beach destinations",
      "Whale watching in Mirissa",
      "Surfing lessons (optional)",
      "Galle Fort exploration",
      "Sunset cruises",
      "Beachside accommodations"
    ],
    itinerary: [
      "Day 1: Airport → Galle",
      "Day 2: Galle (Fort tour, Unawatuna beach)",
      "Day 3: Galle → Mirissa",
      "Day 4: Mirissa (Whale watching, beach time)",
      "Day 5: Mirissa → Arugam Bay",
      "Day 6-7: Arugam Bay (Surfing, relaxation)",
      "Day 8: Arugam Bay → Airport"
    ],
    includes: [
      "Beachfront accommodation",
      "Private vehicle",
      "Whale watching tour",
      "Breakfast daily",
      "Surfboard rental (1 day)"
    ],
    destinations: ["Galle", "Mirissa", "Arugam Bay"],
    category: "Beach",
    difficulty: "Easy",
    groupSize: "2-8 people",
    bestTime: "November to April (West/South), April to September (East)"
  },
  {
    id: "hill-country",
    name: "Hill Country Explorer",
    duration: "6 Days / 5 Nights",
    price: "From $749",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    description: "Journey through the misty mountains, tea plantations, and cool climate of Sri Lanka's hill country.",
    highlights: [
      "Scenic train journey (Kandy to Ella)",
      "Tea plantation tours and tastings",
      "Hiking to Ella Rock and Little Adam's Peak",
      "Nine Arch Bridge visit",
      "Gregory Lake in Nuwara Eliya",
      "Traditional tea factory visit"
    ],
    itinerary: [
      "Day 1: Airport → Kandy",
      "Day 2: Kandy (Temple, gardens, cultural show)",
      "Day 3: Kandy → Nuwara Eliya (Train journey)",
      "Day 4: Nuwara Eliya (Tea estates, Gregory Lake)",
      "Day 5: Nuwara Eliya → Ella (Hiking trails)",
      "Day 6: Ella → Airport"
    ],
    includes: [
      "Accommodation (3-4 star hotels)",
      "Private vehicle",
      "Train tickets (Kandy to Ella)",
      "All entrance fees",
      "Tea factory tour",
      "Breakfast daily"
    ],
    destinations: ["Kandy", "Nuwara Eliya", "Ella"],
    category: "Adventure",
    difficulty: "Moderate",
    groupSize: "2-6 people",
    bestTime: "December to May"
  },
  {
    id: "complete-sri-lanka",
    name: "Complete Sri Lanka Experience",
    duration: "14 Days / 13 Nights",
    price: "From $1,899",
    priceNote: "per person (based on 2 travelers)",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "The ultimate Sri Lanka experience covering all major attractions - culture, nature, wildlife, and beaches.",
    highlights: [
      "All UNESCO World Heritage Sites",
      "Cultural Triangle (Anuradhapura, Polonnaruwa, Sigiriya)",
      "Hill country train journey",
      "Wildlife safaris (Yala & Udawalawe)",
      "Beach destinations (Galle, Mirissa)",
      "Tea plantation tours",
      "Traditional experiences"
    ],
    itinerary: [
      "Day 1: Arrival → Anuradhapura",
      "Day 2: Anuradhapura exploration",
      "Day 3: Anuradhapura → Polonnaruwa → Sigiriya",
      "Day 4: Sigiriya → Kandy",
      "Day 5: Kandy → Nuwara Eliya",
      "Day 6: Nuwara Eliya → Ella",
      "Day 7: Ella (Hiking day)",
      "Day 8: Ella → Yala",
      "Day 9: Yala (Safari)",
      "Day 10: Yala → Galle",
      "Day 11: Galle → Mirissa",
      "Day 12: Mirissa (Whale watching)",
      "Day 13: Mirissa → Colombo",
      "Day 14: Colombo → Departure"
    ],
    includes: [
      "Accommodation (mix of 3-4 star hotels)",
      "Private vehicle with guide",
      "All entrance fees",
      "Safari jeeps",
      "Train tickets",
      "Breakfast daily",
      "Some lunches"
    ],
    destinations: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Kandy", "Nuwara Eliya", "Ella", "Yala", "Galle", "Mirissa"],
    category: "Classic",
    difficulty: "Moderate",
    groupSize: "2-8 people",
    bestTime: "December to April"
  }
];

export const topTravelPlaces: TopTravelPlace[] = [
  {
    id: "1",
    title: "Maldives Magic",
    subtitle: "Unlocked",
    duration: "8 Days/7 Night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    emoji: "🌊"
  },
  {
    id: "2",
    title: "Dubai Desert",
    subtitle: "Adventure",
    duration: "7 Days/6 Night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop"
  },
  {
    id: "3",
    title: "Bali: Where",
    subtitle: "Serenity Lives",
    duration: "9 Days/8 Night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    emoji: "🧘"
  },
  {
    id: "4",
    title: "Sri Lanka",
    subtitle: "Cultural Triangle",
    duration: "7 Days/6 Night",
    rating: 5,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
  },
  {
    id: "5",
    title: "Thailand",
    subtitle: "Tropical Paradise",
    duration: "10 Days/9 Night",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop"
  }
];

