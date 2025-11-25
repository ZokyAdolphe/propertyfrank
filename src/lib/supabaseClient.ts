import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export type PropertyType = 'villa' | 'house' | 'apartment' | 'office';
export type PropertyStatus = 'available' | 'rented' | 'pending';

export interface Database {
    public: {
        Tables: {
            properties: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    type: PropertyType;
                    status: PropertyStatus;
                    price: number;
                    currency: string;
                    location_city: string;
                    location_region: string;
                    location_address: string | null;
                    bedrooms: number | null;
                    bathrooms: number | null;
                    area: number | null;
                    area_unit: string;
                    has_pool: boolean;
                    has_beachfront: boolean;
                    is_furnished: boolean;
                    created_at: string;
                    updated_at: string;
                    created_by: string | null;
                };
                Insert: Omit<Database['public']['Tables']['properties']['Row'], 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Database['public']['Tables']['properties']['Insert']>;
            };
            property_images: {
                Row: {
                    id: string;
                    property_id: string;
                    image_url: string;
                    display_order: number;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['property_images']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['property_images']['Insert']>;
            };
            admin_users: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string | null;
                    whatsapp_number: string | null;
                    role: string;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'created_at'>;
                Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
            };
            user_favorites: {
                Row: {
                    id: string;
                    user_id: string;
                    property_id: string;
                    created_at: string;
                };
                Insert: Omit<Database['public']['Tables']['user_favorites']['Row'], 'id' | 'created_at'>;
                Update: Partial<Database['public']['Tables']['user_favorites']['Insert']>;
            };
        };
    };
}
