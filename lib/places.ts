export interface Place {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
}

export interface Province {
  id: string;
  name: string;
  places: Place[];
}

// Sample data has been removed - all data is now stored in Firebase Firestore
// Use Firebase API route to fetch provinces: GET /api/firebase/places

// Empty array - data will be fetched from Firebase
export const provinces: Province[] = [];
