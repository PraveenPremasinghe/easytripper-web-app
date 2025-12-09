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

export const provinces: Province[] = [
  {
    id: "central",
    name: "Central Province",
    places: [
      {
        id: "kandy",
        name: "Kandy",
        province: "Central Province",
        lat: 7.2906,
        lng: 80.6337,
        description: "The cultural capital with the sacred Temple of the Tooth.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      },
      {
        id: "sigiriya",
        name: "Sigiriya",
        province: "Central Province",
        lat: 7.9570,
        lng: 80.7603,
        description: "Ancient rock fortress and UNESCO World Heritage Site.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      },
      {
        id: "nuwara-eliya",
        name: "Nuwara Eliya",
        province: "Central Province",
        lat: 6.9497,
        lng: 80.7891,
        description: "Little England with tea estates and cool climate.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      },
      {
        id: "dambulla",
        name: "Dambulla",
        province: "Central Province",
        lat: 7.8731,
        lng: 80.7718,
        description: "Famous for its Golden Temple and cave complex.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: "uva",
    name: "Uva Province",
    places: [
      {
        id: "ella",
        name: "Ella",
        province: "Uva Province",
        lat: 6.8667,
        lng: 81.0466,
        description: "Mountain paradise with stunning views and hiking trails.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
      },
      {
        id: "haputale",
        name: "Haputale",
        province: "Uva Province",
        lat: 6.7694,
        lng: 80.9576,
        description: "Scenic hill station known for Lipton's Seat.",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: "southern",
    name: "Southern Province",
    places: [
      {
        id: "galle",
        name: "Galle",
        province: "Southern Province",
        lat: 6.0535,
        lng: 80.2210,
        description: "Colonial fort city by the sea.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      },
      {
        id: "mirissa",
        name: "Mirissa",
        province: "Southern Province",
        lat: 5.9482,
        lng: 80.4716,
        description: "Beach paradise for whale watching and surfing.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
      },
      {
        id: "yala",
        name: "Yala National Park",
        province: "Southern Province",
        lat: 6.3803,
        lng: 81.4258,
        description: "Premier wildlife sanctuary with leopards and elephants.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: "northern",
    name: "Northern Province",
    places: [
      {
        id: "jaffna",
        name: "Jaffna",
        province: "Northern Province",
        lat: 9.6615,
        lng: 80.0255,
        description: "Cultural hub of the Tamil north.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: "north-central",
    name: "North Central Province",
    places: [
      {
        id: "anuradhapura",
        name: "Anuradhapura",
        province: "North Central Province",
        lat: 8.3114,
        lng: 80.4037,
        description: "Ancient capital with sacred Buddhist sites.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      },
      {
        id: "polonnaruwa",
        name: "Polonnaruwa",
        province: "North Central Province",
        lat: 7.9403,
        lng: 81.0188,
        description: "Medieval capital with well-preserved ruins.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      }
    ]
  },
  {
    id: "western",
    name: "Western Province",
    places: [
      {
        id: "colombo",
        name: "Colombo",
        province: "Western Province",
        lat: 6.9271,
        lng: 79.8612,
        description: "The commercial capital and vibrant city hub.",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop"
      },
      {
        id: "negombo",
        name: "Negombo",
        province: "Western Province",
        lat: 7.2008,
        lng: 79.8737,
        description: "Coastal city known for its fishing industry and beaches.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
      }
    ]
  }
];
