import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  Timestamp,
  orderBy,
  Firestore,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";
import { Tour, Destination, Vehicle, BlogPost, Story, Testimonial } from "../types";
import { Place, Province } from "../places";

// Collection names
const COLLECTIONS = {
  TOURS: "tours",
  DESTINATIONS: "destinations",
  VEHICLES: "vehicles",
  BLOG_POSTS: "blogPosts",
  STORIES: "stories",
  PROVINCES: "provinces",
  TESTIMONIALS: "testimonials",
} as const;

// Helper function to check Firebase configuration and return non-null db
function checkFirebase(): Firestore {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Please check your environment variables.");
  }
  return db;
}

// ==================== TOURS ====================

export async function getTours(): Promise<Tour[]> {
  const firestore = checkFirebase();
  try {
    const toursRef = collection(firestore, COLLECTIONS.TOURS);
    const querySnapshot = await getDocs(query(toursRef, orderBy("name")));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Tour[];
  } catch (error) {
    console.error("Error getting tours:", error);
    return [];
  }
}

export async function getTour(id: string): Promise<Tour | null> {
  const firestore = checkFirebase();
  try {
    const tourRef = doc(firestore, COLLECTIONS.TOURS, id);
    const tourSnap = await getDoc(tourRef);
    if (!tourSnap.exists()) return null;
    return { id: tourSnap.id, ...tourSnap.data() } as Tour;
  } catch (error) {
    console.error("Error getting tour:", error);
    return null;
  }
}

export async function createTour(tour: Omit<Tour, "id">): Promise<Tour> {
  const firestore = checkFirebase();
  try {
    const tourRef = doc(collection(firestore, COLLECTIONS.TOURS));
    const newTour: Tour = {
      id: tourRef.id,
      ...tour,
    };
    await setDoc(tourRef, {
      ...newTour,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newTour;
  } catch (error) {
    console.error("Error creating tour:", error);
    throw error;
  }
}

export async function updateTour(id: string, tour: Partial<Tour>): Promise<Tour | null> {
  const firestore = checkFirebase();
  try {
    const tourRef = doc(firestore, COLLECTIONS.TOURS, id);
    await updateDoc(tourRef, {
      ...tour,
      updatedAt: serverTimestamp(),
    });
    return await getTour(id);
  } catch (error) {
    console.error("Error updating tour:", error);
    return null;
  }
}

export async function deleteTour(id: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const tourRef = doc(firestore, COLLECTIONS.TOURS, id);
    await deleteDoc(tourRef);
    return true;
  } catch (error) {
    console.error("Error deleting tour:", error);
    return false;
  }
}

// ==================== DESTINATIONS ====================

export async function getDestinations(): Promise<Destination[]> {
  const firestore = checkFirebase();
  try {
    const destRef = collection(firestore, COLLECTIONS.DESTINATIONS);
    const querySnapshot = await getDocs(query(destRef, orderBy("name")));
    return querySnapshot.docs.map((doc) => ({
      slug: doc.id,
      ...doc.data(),
    })) as Destination[];
  } catch (error) {
    console.error("Error getting destinations:", error);
    return [];
  }
}

export async function getDestination(slug: string): Promise<Destination | null> {
  const firestore = checkFirebase();
  try {
    const destRef = doc(firestore, COLLECTIONS.DESTINATIONS, slug);
    const destSnap = await getDoc(destRef);
    if (!destSnap.exists()) return null;
    return { slug: destSnap.id, ...destSnap.data() } as Destination;
  } catch (error) {
    console.error("Error getting destination:", error);
    return null;
  }
}

export async function createDestination(destination: Destination): Promise<Destination> {
  const firestore = checkFirebase();
  try {
    const destRef = doc(firestore, COLLECTIONS.DESTINATIONS, destination.slug);
    await setDoc(destRef, {
      ...destination,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return destination;
  } catch (error) {
    console.error("Error creating destination:", error);
    throw error;
  }
}

export async function updateDestination(
  slug: string,
  destination: Partial<Destination>
): Promise<Destination | null> {
  const firestore = checkFirebase();
  try {
    const destRef = doc(firestore, COLLECTIONS.DESTINATIONS, slug);
    await updateDoc(destRef, {
      ...destination,
      updatedAt: serverTimestamp(),
    });
    return await getDestination(slug);
  } catch (error) {
    console.error("Error updating destination:", error);
    return null;
  }
}

export async function deleteDestination(slug: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const destRef = doc(firestore, COLLECTIONS.DESTINATIONS, slug);
    await deleteDoc(destRef);
    return true;
  } catch (error) {
    console.error("Error deleting destination:", error);
    return false;
  }
}

// ==================== VEHICLES ====================

export async function getVehicles(): Promise<Vehicle[]> {
  const firestore = checkFirebase();
  try {
    const vehiclesRef = collection(firestore, COLLECTIONS.VEHICLES);
    const querySnapshot = await getDocs(query(vehiclesRef, orderBy("name")));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Vehicle[];
  } catch (error) {
    console.error("Error getting vehicles:", error);
    return [];
  }
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const firestore = checkFirebase();
  try {
    const vehicleRef = doc(firestore, COLLECTIONS.VEHICLES, id);
    const vehicleSnap = await getDoc(vehicleRef);
    if (!vehicleSnap.exists()) return null;
    return { id: vehicleSnap.id, ...vehicleSnap.data() } as Vehicle;
  } catch (error) {
    console.error("Error getting vehicle:", error);
    return null;
  }
}

export async function createVehicle(vehicle: Omit<Vehicle, "id">): Promise<Vehicle> {
  const firestore = checkFirebase();
  try {
    const vehicleRef = doc(collection(firestore, COLLECTIONS.VEHICLES));
    const newVehicle: Vehicle = {
      id: vehicleRef.id,
      ...vehicle,
    };
    await setDoc(vehicleRef, {
      ...newVehicle,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newVehicle;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
}

export async function updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
  const firestore = checkFirebase();
  try {
    const vehicleRef = doc(firestore, COLLECTIONS.VEHICLES, id);
    await updateDoc(vehicleRef, {
      ...vehicle,
      updatedAt: serverTimestamp(),
    });
    return await getVehicle(id);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    return null;
  }
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const vehicleRef = doc(firestore, COLLECTIONS.VEHICLES, id);
    await deleteDoc(vehicleRef);
    return true;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    return false;
  }
}

// ==================== BLOG POSTS ====================

export async function getBlogPosts(): Promise<BlogPost[]> {
  const firestore = checkFirebase();
  try {
    const postsRef = collection(firestore, COLLECTIONS.BLOG_POSTS);
    const querySnapshot = await getDocs(
      query(postsRef, orderBy("publishedAt", "desc"))
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      slug: doc.id,
      ...doc.data(),
    })) as BlogPost[];
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const firestore = checkFirebase();
  try {
    const postRef = doc(firestore, COLLECTIONS.BLOG_POSTS, slug);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return null;
    return { id: postSnap.id, slug: postSnap.id, ...postSnap.data() } as BlogPost;
  } catch (error) {
    console.error("Error getting blog post:", error);
    return null;
  }
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const firestore = checkFirebase();
  try {
    const postRef = doc(firestore, COLLECTIONS.BLOG_POSTS, post.slug);
    await setDoc(postRef, {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return post;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

export async function updateBlogPost(
  slug: string,
  post: Partial<BlogPost>
): Promise<BlogPost | null> {
  const firestore = checkFirebase();
  try {
    const postRef = doc(firestore, COLLECTIONS.BLOG_POSTS, slug);
    await updateDoc(postRef, {
      ...post,
      updatedAt: serverTimestamp(),
    });
    return await getBlogPost(slug);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return null;
  }
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const postRef = doc(firestore, COLLECTIONS.BLOG_POSTS, slug);
    await deleteDoc(postRef);
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }
}

// ==================== STORIES ====================

export async function getStories(): Promise<Story[]> {
  const firestore = checkFirebase();
  try {
    const storiesRef = collection(firestore, COLLECTIONS.STORIES);
    const querySnapshot = await getDocs(query(storiesRef, orderBy("date", "desc")));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Story[];
  } catch (error) {
    console.error("Error getting stories:", error);
    return [];
  }
}

export async function getStory(id: string): Promise<Story | null> {
  const firestore = checkFirebase();
  try {
    const storyRef = doc(firestore, COLLECTIONS.STORIES, id);
    const storySnap = await getDoc(storyRef);
    if (!storySnap.exists()) return null;
    return { id: storySnap.id, ...storySnap.data() } as Story;
  } catch (error) {
    console.error("Error getting story:", error);
    return null;
  }
}

export async function createStory(story: Omit<Story, "id">): Promise<Story> {
  const firestore = checkFirebase();
  try {
    const storyRef = doc(collection(firestore, COLLECTIONS.STORIES));
    const newStory: Story = {
      id: storyRef.id,
      ...story,
    };
    await setDoc(storyRef, {
      ...newStory,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newStory;
  } catch (error) {
    console.error("Error creating story:", error);
    throw error;
  }
}

export async function updateStory(id: string, story: Partial<Story>): Promise<Story | null> {
  const firestore = checkFirebase();
  try {
    const storyRef = doc(firestore, COLLECTIONS.STORIES, id);
    await updateDoc(storyRef, {
      ...story,
      updatedAt: serverTimestamp(),
    });
    return await getStory(id);
  } catch (error) {
    console.error("Error updating story:", error);
    return null;
  }
}

export async function deleteStory(id: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const storyRef = doc(firestore, COLLECTIONS.STORIES, id);
    await deleteDoc(storyRef);
    return true;
  } catch (error) {
    console.error("Error deleting story:", error);
    return false;
  }
}

// ==================== PROVINCES & PLACES ====================

export async function getProvinces(): Promise<Province[]> {
  const firestore = checkFirebase();
  try {
    const provincesRef = collection(firestore, COLLECTIONS.PROVINCES);
    const querySnapshot = await getDocs(query(provincesRef, orderBy("name")));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Province[];
  } catch (error) {
    console.error("Error getting provinces:", error);
    return [];
  }
}

export async function getProvince(id: string): Promise<Province | null> {
  const firestore = checkFirebase();
  try {
    const provinceRef = doc(firestore, COLLECTIONS.PROVINCES, id);
    const provinceSnap = await getDoc(provinceRef);
    if (!provinceSnap.exists()) return null;
    return { id: provinceSnap.id, ...provinceSnap.data() } as Province;
  } catch (error) {
    console.error("Error getting province:", error);
    return null;
  }
}

export async function createProvince(province: Omit<Province, "id">): Promise<Province> {
  const firestore = checkFirebase();
  try {
    const provinceRef = doc(collection(firestore, COLLECTIONS.PROVINCES));
    const newProvince: Province = {
      id: provinceRef.id,
      ...province,
    };
    await setDoc(provinceRef, {
      ...newProvince,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newProvince;
  } catch (error) {
    console.error("Error creating province:", error);
    throw error;
  }
}

export async function updateProvince(
  id: string,
  province: Partial<Province>
): Promise<Province | null> {
  const firestore = checkFirebase();
  try {
    const provinceRef = doc(firestore, COLLECTIONS.PROVINCES, id);
    await updateDoc(provinceRef, {
      ...province,
      updatedAt: serverTimestamp(),
    });
    return await getProvince(id);
  } catch (error) {
    console.error("Error updating province:", error);
    return null;
  }
}

export async function deleteProvince(id: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const provinceRef = doc(firestore, COLLECTIONS.PROVINCES, id);
    await deleteDoc(provinceRef);
    return true;
  } catch (error) {
    console.error("Error deleting province:", error);
    return false;
  }
}

// Place management within provinces
export async function addPlaceToProvince(
  provinceId: string,
  place: Place
): Promise<Province | null> {
  checkFirebase();
  try {
    const province = await getProvince(provinceId);
    if (!province) return null;
    province.places.push(place);
    await updateProvince(provinceId, province);
    return province;
  } catch (error) {
    console.error("Error adding place to province:", error);
    return null;
  }
}

export async function updatePlaceInProvince(
  provinceId: string,
  placeId: string,
  place: Partial<Place>
): Promise<Place | null> {
  checkFirebase();
  try {
    const province = await getProvince(provinceId);
    if (!province) return null;
    const index = province.places.findIndex((p) => p.id === placeId);
    if (index === -1) return null;
    province.places[index] = { ...province.places[index], ...place };
    await updateProvince(provinceId, province);
    return province.places[index];
  } catch (error) {
    console.error("Error updating place in province:", error);
    return null;
  }
}

export async function deletePlaceFromProvince(
  provinceId: string,
  placeId: string
): Promise<boolean> {
  checkFirebase();
  try {
    const province = await getProvince(provinceId);
    if (!province) return false;
    const filtered = province.places.filter((p) => p.id !== placeId);
    if (filtered.length === province.places.length) return false;
    province.places = filtered;
    await updateProvince(provinceId, province);
    return true;
  } catch (error) {
    console.error("Error deleting place from province:", error);
    return false;
  }
}

// ==================== TESTIMONIALS ====================

export async function getTestimonials(): Promise<Testimonial[]> {
  const firestore = checkFirebase();
  try {
    const testimonialsRef = collection(firestore, COLLECTIONS.TESTIMONIALS);
    // Try to order by timestamp, but fallback to createdAt if timestamp doesn't exist
    let querySnapshot;
    try {
      querySnapshot = await getDocs(
        query(testimonialsRef, orderBy("timestamp", "desc"))
      );
    } catch {
      // If timestamp field doesn't exist, try createdAt
      try {
        querySnapshot = await getDocs(
          query(testimonialsRef, orderBy("createdAt", "desc"))
        );
      } catch {
        // If neither exists, just get all without ordering
        querySnapshot = await getDocs(testimonialsRef);
      }
    }
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return [];
  }
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  const firestore = checkFirebase();
  try {
    const testimonialRef = doc(firestore, COLLECTIONS.TESTIMONIALS, id);
    const testimonialSnap = await getDoc(testimonialRef);
    if (!testimonialSnap.exists()) return null;
    return { id: testimonialSnap.id, ...testimonialSnap.data() } as Testimonial;
  } catch (error) {
    console.error("Error getting testimonial:", error);
    return null;
  }
}

export async function createTestimonial(
  testimonial: Omit<Testimonial, "id">
): Promise<Testimonial> {
  const firestore = checkFirebase();
  try {
    const testimonialRef = doc(collection(firestore, COLLECTIONS.TESTIMONIALS));
    const timestamp = Date.now();
    const newTestimonial: Testimonial = {
      id: testimonialRef.id,
      ...testimonial,
    };
    
    // Remove undefined values - Firestore doesn't allow undefined
    const dataToSave: any = {
      id: newTestimonial.id,
      name: newTestimonial.name,
      country: newTestimonial.country,
      comment: newTestimonial.comment,
      rating: newTestimonial.rating,
      timestamp,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    // Only include optional fields if they are defined and not null
    if (newTestimonial.avatar !== undefined && newTestimonial.avatar !== null) {
      dataToSave.avatar = newTestimonial.avatar;
    }
    if (newTestimonial.tripRoute !== undefined && newTestimonial.tripRoute !== null) {
      dataToSave.tripRoute = newTestimonial.tripRoute;
    }
    
    await setDoc(testimonialRef, dataToSave);
    return newTestimonial;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
}

export async function updateTestimonial(
  id: string,
  testimonial: Partial<Testimonial>
): Promise<Testimonial | null> {
  const firestore = checkFirebase();
  try {
    const testimonialRef = doc(firestore, COLLECTIONS.TESTIMONIALS, id);
    
    // Remove undefined values - Firestore doesn't allow undefined
    const updateData: any = {
      updatedAt: serverTimestamp(),
    };
    
    // Only include fields that are defined and not null
    if (testimonial.name !== undefined && testimonial.name !== null) updateData.name = testimonial.name;
    if (testimonial.country !== undefined && testimonial.country !== null) updateData.country = testimonial.country;
    if (testimonial.comment !== undefined && testimonial.comment !== null) updateData.comment = testimonial.comment;
    if (testimonial.rating !== undefined && testimonial.rating !== null) updateData.rating = testimonial.rating;
    if (testimonial.avatar !== undefined && testimonial.avatar !== null) updateData.avatar = testimonial.avatar;
    if (testimonial.tripRoute !== undefined && testimonial.tripRoute !== null) updateData.tripRoute = testimonial.tripRoute;
    
    await updateDoc(testimonialRef, updateData);
    return await getTestimonial(id);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return null;
  }
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const firestore = checkFirebase();
  try {
    const testimonialRef = doc(firestore, COLLECTIONS.TESTIMONIALS, id);
    await deleteDoc(testimonialRef);
    return true;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
}

