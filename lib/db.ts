import { promises as fs } from 'fs';
import path from 'path';
import { Tour, Destination, Vehicle, BlogPost, Story } from './types';
import { Place, Province } from './places';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Generic read function
async function readFile<T>(filename: string, defaultValue: T[]): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist, return default and create it
    await writeFile(filename, defaultValue);
    return defaultValue;
  }
}

// Generic write function
async function writeFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Tours
export async function getTours(): Promise<Tour[]> {
  return readFile<Tour>('tours.json', []);
}

export async function getTour(id: string): Promise<Tour | null> {
  const tours = await getTours();
  return tours.find(t => t.id === id) || null;
}

export async function createTour(tour: Tour): Promise<Tour> {
  const tours = await getTours();
  tours.push(tour);
  await writeFile('tours.json', tours);
  return tour;
}

export async function updateTour(id: string, tour: Partial<Tour>): Promise<Tour | null> {
  const tours = await getTours();
  const index = tours.findIndex(t => t.id === id);
  if (index === -1) return null;
  tours[index] = { ...tours[index], ...tour };
  await writeFile('tours.json', tours);
  return tours[index];
}

export async function deleteTour(id: string): Promise<boolean> {
  const tours = await getTours();
  const filtered = tours.filter(t => t.id !== id);
  if (filtered.length === tours.length) return false;
  await writeFile('tours.json', filtered);
  return true;
}

// Destinations
export async function getDestinations(): Promise<Destination[]> {
  return readFile<Destination>('destinations.json', []);
}

export async function getDestination(slug: string): Promise<Destination | null> {
  const destinations = await getDestinations();
  return destinations.find(d => d.slug === slug) || null;
}

export async function createDestination(destination: Destination): Promise<Destination> {
  const destinations = await getDestinations();
  destinations.push(destination);
  await writeFile('destinations.json', destinations);
  return destination;
}

export async function updateDestination(slug: string, destination: Partial<Destination>): Promise<Destination | null> {
  const destinations = await getDestinations();
  const index = destinations.findIndex(d => d.slug === slug);
  if (index === -1) return null;
  destinations[index] = { ...destinations[index], ...destination };
  await writeFile('destinations.json', destinations);
  return destinations[index];
}

export async function deleteDestination(slug: string): Promise<boolean> {
  const destinations = await getDestinations();
  const filtered = destinations.filter(d => d.slug !== slug);
  if (filtered.length === destinations.length) return false;
  await writeFile('destinations.json', filtered);
  return true;
}

// Vehicles
export async function getVehicles(): Promise<Vehicle[]> {
  return readFile<Vehicle>('vehicles.json', []);
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  return vehicles.find(v => v.id === id) || null;
}

export async function createVehicle(vehicle: Vehicle): Promise<Vehicle> {
  const vehicles = await getVehicles();
  vehicles.push(vehicle);
  await writeFile('vehicles.json', vehicles);
  return vehicle;
}

export async function updateVehicle(id: string, vehicle: Partial<Vehicle>): Promise<Vehicle | null> {
  const vehicles = await getVehicles();
  const index = vehicles.findIndex(v => v.id === id);
  if (index === -1) return null;
  vehicles[index] = { ...vehicles[index], ...vehicle };
  await writeFile('vehicles.json', vehicles);
  return vehicles[index];
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const vehicles = await getVehicles();
  const filtered = vehicles.filter(v => v.id !== id);
  if (filtered.length === vehicles.length) return false;
  await writeFile('vehicles.json', filtered);
  return true;
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return readFile<BlogPost>('blogPosts.json', []);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find(p => p.slug === slug) || null;
}

export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  const posts = await getBlogPosts();
  posts.push(post);
  await writeFile('blogPosts.json', posts);
  return post;
}

export async function updateBlogPost(slug: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const index = posts.findIndex(p => p.slug === slug);
  if (index === -1) return null;
  posts[index] = { ...posts[index], ...post };
  await writeFile('blogPosts.json', posts);
  return posts[index];
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const posts = await getBlogPosts();
  const filtered = posts.filter(p => p.slug !== slug);
  if (filtered.length === posts.length) return false;
  await writeFile('blogPosts.json', filtered);
  return true;
}

// Travel Stories
export async function getStories(): Promise<Story[]> {
  return readFile<Story>('stories.json', []);
}

export async function getStory(id: string): Promise<Story | null> {
  const stories = await getStories();
  return stories.find(s => s.id === id) || null;
}

export async function createStory(story: Story): Promise<Story> {
  const stories = await getStories();
  stories.push(story);
  await writeFile('stories.json', stories);
  return story;
}

export async function updateStory(id: string, story: Partial<Story>): Promise<Story | null> {
  const stories = await getStories();
  const index = stories.findIndex(s => s.id === id);
  if (index === -1) return null;
  stories[index] = { ...stories[index], ...story };
  await writeFile('stories.json', stories);
  return stories[index];
}

export async function deleteStory(id: string): Promise<boolean> {
  const stories = await getStories();
  const filtered = stories.filter(s => s.id !== id);
  if (filtered.length === stories.length) return false;
  await writeFile('stories.json', filtered);
  return true;
}

// Places/Provinces
export async function getProvinces(): Promise<Province[]> {
  return readFile<Province>('provinces.json', []);
}

export async function getProvince(id: string): Promise<Province | null> {
  const provinces = await getProvinces();
  return provinces.find(p => p.id === id) || null;
}

export async function createProvince(province: Province): Promise<Province> {
  const provinces = await getProvinces();
  provinces.push(province);
  await writeFile('provinces.json', provinces);
  return province;
}

export async function updateProvince(id: string, province: Partial<Province>): Promise<Province | null> {
  const provinces = await getProvinces();
  const index = provinces.findIndex(p => p.id === id);
  if (index === -1) return null;
  provinces[index] = { ...provinces[index], ...province };
  await writeFile('provinces.json', provinces);
  return provinces[index];
}

export async function deleteProvince(id: string): Promise<boolean> {
  const provinces = await getProvinces();
  const filtered = provinces.filter(p => p.id !== id);
  if (filtered.length === provinces.length) return false;
  await writeFile('provinces.json', filtered);
  return true;
}

// Place management within provinces
export async function addPlaceToProvince(provinceId: string, place: Place): Promise<Province | null> {
  const province = await getProvince(provinceId);
  if (!province) return null;
  province.places.push(place);
  await updateProvince(provinceId, province);
  return province;
}

export async function updatePlaceInProvince(provinceId: string, placeId: string, place: Partial<Place>): Promise<Place | null> {
  const province = await getProvince(provinceId);
  if (!province) return null;
  const index = province.places.findIndex(p => p.id === placeId);
  if (index === -1) return null;
  province.places[index] = { ...province.places[index], ...place };
  await updateProvince(provinceId, province);
  return province.places[index];
}

export async function deletePlaceFromProvince(provinceId: string, placeId: string): Promise<boolean> {
  const province = await getProvince(provinceId);
  if (!province) return false;
  const filtered = province.places.filter(p => p.id !== placeId);
  if (filtered.length === province.places.length) return false;
  province.places = filtered;
  await updateProvince(provinceId, province);
  return true;
}

