export interface Listing {
    id: number;
    title: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    price_per_night: number;
    num_bedrooms: number;
    num_bathrooms: number;
    max_guests: number;
    user_id: number;
    photo_url: string[];
  }
  