import { Destination, Story, Testimonial, FAQ, ThingToDo, Tour, TopTravelPlace, Vehicle, BlogPost } from "./types";

// Sample data has been removed - all data is now stored in Firebase Firestore
// Use Firebase API routes to fetch data:
// - GET /api/firebase/tours
// - GET /api/firebase/destinations
// - GET /api/firebase/vehicles
// - GET /api/firebase/blog
// - GET /api/firebase/stories
// - GET /api/firebase/places

// Empty arrays - data will be fetched from Firebase
export const destinations: Destination[] = [];
export const tours: Tour[] = [];
export const vehicles: Vehicle[] = [];
export const blogPosts: BlogPost[] = [];
export const stories: Story[] = [];

// Static data that doesn't need Firebase (can be kept or moved to Firebase later)
export const testimonials: Testimonial[] = [
  // Add your actual testimonials here or move to Firebase
];

export const faqs: FAQ[] = [
  // Add your actual FAQs here or move to Firebase
];

export const thingsToDo: ThingToDo[] = [
  // Add your actual things to do here or move to Firebase
];

export const topTravelPlaces: TopTravelPlace[] = [
  // Add your actual top places here or move to Firebase
];
