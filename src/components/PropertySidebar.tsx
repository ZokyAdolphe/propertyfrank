import { useMemo } from 'react';
import { useProperties } from '../hooks/useProperties';

interface PropertySidebarProps {
    language: 'fr' | 'en';
    onFilterChange: (filters: any) => void;
}

export default function PropertySidebar({ language, onFilterChange }: PropertySidebarProps) {
    const { properties } = useProperties();

    const translations = {
        fr: {
            filters: 'Filtres',
            type: 'Type de propriété',
            all: 'Tous',
            villa: 'Villas',
            house: 'Maisons',
            apartment: 'Appartements',
            office: 'Bureaux',
            location: 'Localisation',
            priceRange: 'Gamme de prix',
            features: 'Caractéristiques',
            pool: 'Piscine',
            beachfront: 'Bord de mer',
            furnished: 'Meublé',
            reset: 'Réinitialiser',
            stats: 'Statistiques rapides',
            totalProperties: 'Propriétés totales',
            avgPrice: 'Prix moyen',
            newThisMonth: 'Nouveautés ce mois'
        },
        en: {
            filters: 'Filters',
            type: 'Property type',
            all: 'All',
            villa: 'Villas',
            house: 'Houses',
            apartment: 'Apartments',
            office: 'Offices',
            location: 'Location',
            priceRange: 'Price range',
            features: 'Features',
            pool: 'Pool',
            beachfront: 'Beachfront',
            furnished: 'Furnished',
            reset: 'Reset',
            stats: 'Quick Stats',
            totalProperties: 'Total Properties',
            avgPrice: 'Average Price',
            newThisMonth: 'New This Month'
        }
    };

    const t = translations[language];

    // Calculate statistics and counts
    const stats = useMemo(() => {
        const counts = {
            types: { villa: 0, house: 0, apartment: 0, office: 0 },
            locations: {} as Record<string, number>,
            prices: {
                under50k: 0,
                range50k100k: 0,
                range100k200k: 0,
                over200k: 0
            },
            features: {
                pool: 0,
                beachfront: 0,
                furnished: 0
            },
            total: properties.length,
            avgPrice: 0,
            newThisMonth: 0
        };

        let totalPrice = 0;
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        properties.forEach(p => {
            // Type counts
            if (p.type in counts.types) {
                counts.types[p.type as keyof typeof counts.types]++;
            }

            // Location counts
            const city = p.location.city;
            counts.locations[city] = (counts.locations[city] || 0) + 1;

            // Price counts
            if (p.price < 50000) counts.prices.under50k++;
            else if (p.price < 100000) counts.prices.range50k100k++;
            else if (p.price < 200000) counts.prices.range100k200k++;
            else counts.prices.over200k++;

            // Feature counts
            if (p.features.pool) counts.features.pool++;
            if (p.features.beachfront) counts.features.beachfront++;
            if (p.features.furnished) counts.features.furnished++;

            // General stats
            totalPrice += p.price;
            if (new Date(p.createdAt) >= startOfMonth) {
                counts.newThisMonth++;
            }
        });

        stats.avgPrice = properties.length > 0 ? Math.round(totalPrice / properties.length) : 0;

        return counts;
    }, [properties]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
            style: 'currency',
            currency: 'MUR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {t.stats}
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{t.totalProperties}</span>
                        <span className="font-bold text-slate-900">{stats.total}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{t.newThisMonth}</span>
                        <span className="font-bold text-green-600">+{stats.newThisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{t.avgPrice}</span>
                        <span className="font-bold text-blue-600">{formatPrice(stats.avgPrice)}</span>
                    </div>
                </div>
            </div>

            {/* Filters Card */}
            <div className="card p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>
                    {t.filters}
                </h3>

                {/* Type Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-700 flex justify-between">
                        {t.type}
                    </h4>
                    <div className="space-y-2">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="type"
                                    value="all"
                                    defaultChecked
                                    onChange={(e) => onFilterChange({ type: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.all}</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.total}</span>
                        </label>
                        {Object.entries(stats.types).map(([type, count]) => (
                            <label key={type} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type}
                                        onChange={(e) => onFilterChange({ type: e.target.value })}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t[type as keyof typeof t]}</span>
                                </div>
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{count}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-700">
                        {t.location}
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="location"
                                    value="all"
                                    defaultChecked
                                    onChange={() => onFilterChange({ city: 'all' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.all}</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.total}</span>
                        </label>
                        {Object.entries(stats.locations).map(([city, count]) => (
                            <label key={city} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="location"
                                        value={city}
                                        onChange={(e) => onFilterChange({ city: e.target.value })}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{city}</span>
                                </div>
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{count}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-700">
                        {t.priceRange}
                    </h4>
                    <div className="space-y-2">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="price"
                                    value="all"
                                    defaultChecked
                                    onChange={() => onFilterChange({ priceRange: 'all' })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.all}</span>
                            </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="price"
                                    value="0-50000"
                                    onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">&lt; 50k MUR</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.prices.under50k}</span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="price"
                                    value="50000-100000"
                                    onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">50k - 100k MUR</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.prices.range50k100k}</span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="price"
                                    value="100000-200000"
                                    onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">100k - 200k MUR</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.prices.range100k200k}</span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="price"
                                    value="200000"
                                    onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">200k+ MUR</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.prices.over200k}</span>
                        </label>
                    </div>
                </div>

                {/* Features Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-700">
                        {t.features}
                    </h4>
                    <div className="space-y-2">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => onFilterChange({ hasPool: e.target.checked })}
                                    className="w-4 h-4 rounded text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.pool}</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.features.pool}</span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => onFilterChange({ hasBeachfront: e.target.checked })}
                                    className="w-4 h-4 rounded text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.beachfront}</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.features.beachfront}</span>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    onChange={(e) => onFilterChange({ isFurnished: e.target.checked })}
                                    className="w-4 h-4 rounded text-blue-600"
                                />
                                <span className="text-slate-600 group-hover:text-blue-600 transition-colors">{t.furnished}</span>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{stats.features.furnished}</span>
                        </label>
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    onClick={() => window.location.reload()}
                    className="w-full btn-secondary transition-all hover:shadow-md"
                >
                    {t.reset}
                </button>
            </div>
        </div>
    );
}
