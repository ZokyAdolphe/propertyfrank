export type PropertyType = 'villa' | 'house' | 'apartment' | 'office' | 'furniture';

export type PropertyStatus = 'available' | 'rented' | 'pending';

export interface Property {
    id: string;
    title: string;
    description: string;
    type: PropertyType;
    status: PropertyStatus;
    price: number;
    currency: 'MUR' | 'USD' | 'EUR';
    location: {
        address: string;
        city: string;
        region: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    features: {
        bedrooms?: number;
        bathrooms?: number;
        area: number;
        areaUnit: 'sqm' | 'sqft';
        parking?: number;
        furnished: boolean;
        airConditioning: boolean;
        pool?: boolean;
        beachfront?: boolean;
        garden?: boolean;
    };
    images: string[];
    amenities: string[];
    availableFrom: string;
    minimumRental?: string;
    targetAudience: ('local' | 'expat' | 'tourist' | 'business')[];
    owner: {
        name: string;
        phone: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface SearchFilters {
    type?: PropertyType;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    minArea?: number;
    maxArea?: number;
    furnished?: boolean;
    beachfront?: boolean;
    pool?: boolean;
    targetAudience?: ('local' | 'expat' | 'tourist' | 'business')[];
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: string;
}
