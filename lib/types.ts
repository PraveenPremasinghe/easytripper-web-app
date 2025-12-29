export type Destination = {
  slug: string;
  name: string;
  region: string; // e.g., Central, South, East
  excerpt: string;
  image: string;  // /images/...
  highlights: string[];
  description?: string;
  bestTime?: string;
  duration?: string;
};

export type Story = {
  id: string;
  title: string;
  cover: string;
  gallery: string[];
  tags: string[];
  excerpt: string;
  date?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  avatar?: string;
  rating: number;       // 1..5
  comment: string;
  tripRoute?: string;   // e.g., "Colombo → Kandy → Ella → Yala"
};

export type FAQ = {
  q: string;
  a: string;
};

export type ThingToDo = {
  id: string;
  title: string;
  category: "Culture" | "Nature" | "Beaches" | "Wildlife" | "Food";
  image: string;
  description: string;
  location?: string;
};

export type Tour = {
  id: string;
  name: string;
  duration: string;
  price: string;
  priceNote?: string;
  image: string;
  description: string;
  highlights: string[];
  itinerary: string[];
  includes: string[];
  excludes?: string[];
  destinations: string[];
  category: "Classic" | "Adventure" | "Luxury" | "Cultural" | "Wildlife" | "Beach";
  difficulty?: "Easy" | "Moderate" | "Challenging";
  groupSize?: string;
  bestTime: string;
};

export type TopTravelPlace = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  rating: number; // 1-5, can be decimal like 4.5
  image: string;
  emoji?: string;
};

export type Vehicle = {
  id: string;
  name: string;
  category: "Car" | "Van" | "Mini Bus" | "Bus" | "4x4";
  passengers: string;
  luggage: string;
  idealFor: string[];
  features: string[];
  image: string;
};

