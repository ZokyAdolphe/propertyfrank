import type { Property } from '../types';

export const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Villa de Luxe Vue Mer - Grand Baie',
        description: 'Magnifique villa contemporaine avec vue panoramique sur l\'océan Indien. Située dans le quartier prisé de Grand Baie, cette propriété offre un cadre de vie exceptionnel avec accès direct à la plage.',
        type: 'villa',
        status: 'available',
        price: 150000,
        currency: 'MUR',
        location: {
            address: '15 Coastal Road',
            city: 'Grand Baie',
            region: 'Nord',
            coordinates: {
                lat: -20.0104,
                lng: 57.5804
            }
        },
        features: {
            bedrooms: 4,
            bathrooms: 3,
            area: 350,
            areaUnit: 'sqm',
            parking: 2,
            furnished: true,
            airConditioning: true,
            pool: true,
            beachfront: true,
            garden: true
        },
        images: [
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        amenities: [
            'Piscine privée',
            'Accès plage',
            'Jardin tropical',
            'Cuisine équipée',
            'Wifi haut débit',
            'Sécurité 24/7',
            'Parking couvert',
            'Terrasse vue mer'
        ],
        availableFrom: '2025-12-01',
        minimumRental: '6 mois',
        targetAudience: ['expat', 'business'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 123 4567',
            email: 'contact@propertycloud.mu'
        },
        createdAt: '2025-11-01',
        updatedAt: '2025-11-20'
    },
    {
        id: '2',
        title: 'Appartement Moderne - Flic en Flac',
        description: 'Superbe appartement en bord de mer avec vue imprenable sur le coucher de soleil. Idéal pour les expatriés et touristes recherchant confort et proximité de la plage.',
        type: 'apartment',
        status: 'available',
        price: 45000,
        currency: 'MUR',
        location: {
            address: 'Residence Sunset, Avenue des Cocotiers',
            city: 'Flic en Flac',
            region: 'Ouest',
            coordinates: {
                lat: -20.2769,
                lng: 57.3692
            }
        },
        features: {
            bedrooms: 2,
            bathrooms: 2,
            area: 120,
            areaUnit: 'sqm',
            parking: 1,
            furnished: true,
            airConditioning: true,
            pool: true,
            beachfront: true,
            garden: false
        },
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
        ],
        amenities: [
            'Piscine commune',
            'Proche plage (50m)',
            'Balcon vue mer',
            'Climatisation',
            'Internet fibre',
            'Salle de sport',
            'Parking sécurisé'
        ],
        availableFrom: '2025-11-25',
        minimumRental: '3 mois',
        targetAudience: ['tourist', 'expat'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 234 5678',
            email: 'contact@propertycloud.mu'
        },
        createdAt: '2025-11-10',
        updatedAt: '2025-11-22'
    },
    {
        id: '3',
        title: 'Bureau Premium - Ebène Cybercity',
        description: 'Espace de bureau moderne et lumineux au cœur d\'Ebène Cybercity. Parfait pour les entreprises internationales et startups. Infrastructure complète avec fibre optique.',
        type: 'office',
        status: 'available',
        price: 85000,
        currency: 'MUR',
        location: {
            address: 'Tower A, Cyber City',
            city: 'Ebène',
            region: 'Plaines Wilhems',
            coordinates: {
                lat: -20.2444,
                lng: 57.4897
            }
        },
        features: {
            area: 200,
            areaUnit: 'sqm',
            parking: 5,
            furnished: true,
            airConditioning: true,
            pool: false,
            beachfront: false,
            garden: false
        },
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'
        ],
        amenities: [
            'Fibre optique 1Gbps',
            'Salles de réunion',
            'Réception',
            'Cuisine équipée',
            'Parking visiteurs',
            'Sécurité 24/7',
            'Accès métro',
            'Climatisation centrale'
        ],
        availableFrom: '2025-12-15',
        minimumRental: '12 mois',
        targetAudience: ['business'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 345 6789',
            email: 'commercial@propertycloud.mu'
        },
        createdAt: '2025-11-05',
        updatedAt: '2025-11-21'
    },
    {
        id: '4',
        title: 'Maison Familiale - Quatre Bornes',
        description: 'Charmante maison familiale dans un quartier résidentiel calme. Idéale pour les familles expatriées avec enfants. Proche des écoles internationales.',
        type: 'house',
        status: 'available',
        price: 55000,
        currency: 'MUR',
        location: {
            address: 'Avenue des Flamboyants',
            city: 'Quatre Bornes',
            region: 'Plaines Wilhems',
            coordinates: {
                lat: -20.2633,
                lng: 57.4794
            }
        },
        features: {
            bedrooms: 3,
            bathrooms: 2,
            area: 180,
            areaUnit: 'sqm',
            parking: 2,
            furnished: false,
            airConditioning: true,
            pool: false,
            beachfront: false,
            garden: true
        },
        images: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
        ],
        amenities: [
            'Grand jardin',
            'Garage double',
            'Quartier sécurisé',
            'Proche écoles',
            'Proche commerces',
            'Terrasse couverte'
        ],
        availableFrom: '2026-01-01',
        minimumRental: '12 mois',
        targetAudience: ['expat', 'local'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 456 7890',
            email: 'contact@propertycloud.mu'
        },
        createdAt: '2025-11-15',
        updatedAt: '2025-11-23'
    },
    {
        id: '5',
        title: 'Villa Tropicale - Tamarin',
        description: 'Villa de charme nichée dans un écrin de verdure à Tamarin. Vue montagne et proche de la célèbre baie des surfeurs. Parfait pour un style de vie décontracté.',
        type: 'villa',
        status: 'available',
        price: 95000,
        currency: 'MUR',
        location: {
            address: 'Chemin des Palmiers',
            city: 'Tamarin',
            region: 'Ouest',
            coordinates: {
                lat: -20.3247,
                lng: 57.3708
            }
        },
        features: {
            bedrooms: 3,
            bathrooms: 2,
            area: 250,
            areaUnit: 'sqm',
            parking: 2,
            furnished: true,
            airConditioning: true,
            pool: true,
            beachfront: false,
            garden: true
        },
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
        ],
        amenities: [
            'Piscine privée',
            'Jardin tropical',
            'Vue montagne',
            'Proche surf spot',
            'BBQ extérieur',
            'Terrasse spacieuse',
            'Cuisine moderne'
        ],
        availableFrom: '2025-12-01',
        minimumRental: '6 mois',
        targetAudience: ['tourist', 'expat'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 567 8901',
            email: 'contact@propertycloud.mu'
        },
        createdAt: '2025-11-08',
        updatedAt: '2025-11-24'
    },
    {
        id: '6',
        title: 'Penthouse Luxe - Port Louis Waterfront',
        description: 'Penthouse d\'exception avec vue à 360° sur le port et l\'océan. Finitions haut de gamme et services de conciergerie. Le summum du luxe urbain à Maurice.',
        type: 'apartment',
        status: 'available',
        price: 180000,
        currency: 'MUR',
        location: {
            address: 'Caudan Waterfront, Tower Prestige',
            city: 'Port Louis',
            region: 'Port Louis',
            coordinates: {
                lat: -20.1609,
                lng: 57.5012
            }
        },
        features: {
            bedrooms: 3,
            bathrooms: 3,
            area: 280,
            areaUnit: 'sqm',
            parking: 3,
            furnished: true,
            airConditioning: true,
            pool: true,
            beachfront: false,
            garden: false
        },
        images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
            'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800'
        ],
        amenities: [
            'Piscine rooftop',
            'Salle de sport privée',
            'Conciergerie 24/7',
            'Vue panoramique',
            'Domotique complète',
            'Cave à vin',
            'Terrasse 100m²',
            'Parking souterrain'
        ],
        availableFrom: '2026-01-15',
        minimumRental: '12 mois',
        targetAudience: ['business', 'expat'],
        owner: {
            name: 'Property Cloud Maurice',
            phone: '+230 5 678 9012',
            email: 'prestige@propertycloud.mu'
        },
        createdAt: '2025-11-12',
        updatedAt: '2025-11-25'
    }
];
