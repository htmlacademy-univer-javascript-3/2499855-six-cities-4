import { Review } from './review';
import { Point } from './point';
import { City } from './city';
import { User } from './user';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Point;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;

  previewImage?: string;

  description?: string;
  bedrooms?: number;
  goods?: string[];
  host?: User;
  images?: string[];
  maxAdults?: number;

  reviews?: Review[];
  nearby?: Offer[];
}
