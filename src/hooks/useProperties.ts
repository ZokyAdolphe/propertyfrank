import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Property, PropertyType, PropertyStatus } from '../types';

export function useProperties() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProperties();

        // Subscribe to realtime changes
        const channel = supabase
            .channel('properties_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'properties'
                },
                () => {
                    fetchProperties();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function fetchProperties() {
        try {
            setLoading(true);

            // Fetch properties with their images
            const { data: propertiesData, error: propertiesError } = await supabase
                .from('properties')
                .select(`
          *,
          property_images (
            id,
            image_url,
            display_order
          )
        `)
                .order('created_at', { ascending: false });

            if (propertiesError) throw propertiesError;

            // Transform data to match Property type
            const transformedProperties: Property[] = (propertiesData || []).map((prop: any) => ({
                id: prop.id,
                title: prop.title,
                description: prop.description || '',
                type: prop.type as PropertyType,
                status: prop.status as PropertyStatus,
                price: Number(prop.price),
                currency: prop.currency as 'MUR' | 'USD' | 'EUR',
                location: {
                    city: prop.location_city,
                    region: prop.location_region,
                    address: prop.location_address || ''
                },
                features: {
                    bedrooms: prop.bedrooms || 0,
                    bathrooms: prop.bathrooms || 0,
                    area: Number(prop.area) || 0,
                    areaUnit: (prop.area_unit === 'm²' ? 'sqm' : 'sqft') as 'sqm' | 'sqft',
                    pool: prop.has_pool,
                    beachfront: prop.has_beachfront,
                    furnished: prop.is_furnished,
                    airConditioning: false,
                    parking: 0
                },
                images: (prop.property_images || [])
                    .sort((a: any, b: any) => a.display_order - b.display_order)
                    .map((img: any) => img.image_url),
                amenities: [],
                availableFrom: prop.created_at,
                minimumRental: '1 mois',
                targetAudience: ['local', 'expat', 'tourist', 'business'],
                owner: {
                    name: 'PropertyFrank',
                    phone: '+230 5 123 4567',
                    email: 'contact@propertyfrank.mu'
                },
                createdAt: prop.created_at,
                updatedAt: prop.updated_at
            }));

            setProperties(transformedProperties);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching properties:', err);
        } finally {
            setLoading(false);
        }
    }

    return { properties, loading, error, refetch: fetchProperties };
}

export function usePropertyFilters(properties: Property[]) {
    const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
    const [filters, setFilters] = useState({
        type: 'all' as string,
        city: 'all' as string,
        priceRange: 'all' as string,
        hasPool: false,
        hasBeachfront: false,
        isFurnished: false
    });

    useEffect(() => {
        let filtered = [...properties];

        // Filter by type
        if (filters.type !== 'all') {
            filtered = filtered.filter((p: Property) => p.type === filters.type);
        }

        // Filter by city
        if (filters.city !== 'all') {
            filtered = filtered.filter((p: Property) => p.location.city === filters.city);
        }

        // Filter by price range
        if (filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);
            if (max) {
                filtered = filtered.filter((p: Property) => p.price >= min && p.price <= max);
            } else {
                filtered = filtered.filter((p: Property) => p.price >= min);
            }
        }

        // Filter by features
        if (filters.hasPool) {
            filtered = filtered.filter((p: Property) => p.features.pool);
        }
        if (filters.hasBeachfront) {
            filtered = filtered.filter((p: Property) => p.features.beachfront);
        }
        if (filters.isFurnished) {
            filtered = filtered.filter((p: Property) => p.features.furnished);
        }

        setFilteredProperties(filtered);
    }, [properties, filters]);

    return { filteredProperties, filters, setFilters };
}
