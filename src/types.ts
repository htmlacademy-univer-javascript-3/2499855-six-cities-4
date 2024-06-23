export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
};

type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
};

type City = {
    name: string;
    location: Location;
};

export type Review = {
    id: number;
    date: string;
    user: User;
    text: string;
};

type User = {
    id: number;
    name: string;
};
