import { useState } from 'react';
import type { PropertyType } from '../types';

interface HeroProps {
    onSearch: (filters: { type?: PropertyType; location?: string; minPrice?: number; maxPrice?: number }) => void;
    language: 'fr' | 'en';
}

export default function Hero({ onSearch, language }: HeroProps) {
    const [searchType, setSearchType] = useState<PropertyType | ''>('');
    const [searchLocation, setSearchLocation] = useState('');

    const translations = {
        fr: {
            title: 'Trouvez Votre Propriété de Rêve',
            subtitle: 'à l\'Île Maurice',
            description: 'Villas en bord de mer, appartements modernes, bureaux premium et maisons familiales. Votre nouvelle vie commence ici.',
            searchPlaceholder: 'Ville, région ou adresse...',
            searchButton: 'Rechercher',
            propertyTypes: {
                all: 'Tous types',
                villa: 'Villa',
                house: 'Maison',
                apartment: 'Appartement',
                office: 'Bureau',
                furniture: 'Mobilier'
            },
            stats: {
                properties: 'Propriétés',
                clients: 'Clients Satisfaits',
                regions: 'Régions'
            }
        },
        en: {
            title: 'Find Your Dream Property',
            subtitle: 'in Mauritius',
            description: 'Beachfront villas, modern apartments, premium offices and family homes. Your new life starts here.',
            searchPlaceholder: 'City, region or address...',
            searchButton: 'Search',
            propertyTypes: {
                all: 'All types',
                villa: 'Villa',
                house: 'House',
                apartment: 'Apartment',
                office: 'Office',
                furniture: 'Furniture'
            },
            stats: {
                properties: 'Properties',
                clients: 'Happy Clients',
                regions: 'Regions'
            }
        }
    };

    const t = translations[language];

    const handleSearch = () => {
        onSearch({
            type: searchType || undefined,
            location: searchLocation || undefined
        });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #ecfeff)' }}></div>
                <div className="absolute top-20 left-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ background: '#7dd3fc' }}></div>
                <div className="absolute top-40 right-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-200" style={{ background: '#fca5a5' }}></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-400" style={{ background: '#67e8f9' }}></div>
            </div>

            <div className="section-container text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Main Title */}
                    <div className="animate-slide-up">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
                            {t.title}
                            <span className="block gradient-text mt-2">{t.subtitle}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
                            {t.description}
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="glass rounded-2xl p-6 md:p-8 mb-12 animate-scale-in animation-delay-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Property Type Selector */}
                            <div className="flex-1">
                                <select
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value as PropertyType | '')}
                                    className="input w-full"
                                >
                                    <option value="">{t.propertyTypes.all}</option>
                                    <option value="villa">{t.propertyTypes.villa}</option>
                                    <option value="house">{t.propertyTypes.house}</option>
                                    <option value="apartment">{t.propertyTypes.apartment}</option>
                                    <option value="office">{t.propertyTypes.office}</option>
                                    <option value="furniture">{t.propertyTypes.furniture}</option>
                                </select>
                            </div>

                            {/* Location Input */}
                            <div className="flex-1 relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    className="input input-icon w-full"
                                />
                            </div>

                            {/* Search Button */}
                            <button onClick={handleSearch} className="btn-primary whitespace-nowrap">
                                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {t.searchButton}
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up animation-delay-400">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #0284c7, #0891b2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>500+</div>
                            <div style={{ color: '#475569' }} className="text-sm md:text-base">{t.stats.properties}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>2,000+</div>
                            <div style={{ color: '#475569' }} className="text-sm md:text-base">{t.stats.clients}</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold mb-2" style={{ background: 'linear-gradient(to right, #0284c7, #0891b2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>9</div>
                            <div style={{ color: '#475569' }} className="text-sm md:text-base">{t.stats.regions}</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
