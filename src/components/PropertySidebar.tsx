import { useProperties } from '../hooks/useProperties';

interface PropertySidebarProps {
    language: 'fr' | 'en';
    onFilterChange: (filters: any) => void;
}

export default function PropertySidebar({ language, onFilterChange }: PropertySidebarProps) {
    const { properties } = useProperties();

    // Extract unique values for filters
    const cities = [...new Set(properties.map(p => p.location.city))];
    const types = ['villa', 'house', 'apartment', 'office'];

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
            reset: 'Réinitialiser'
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
            reset: 'Reset'
        }
    };

    const t = translations[language];

    return (
        <div className="card p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>
                {t.filters}
            </h3>

            {/* Type Filter */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3" style={{ color: '#334155' }}>
                    {t.type}
                </h4>
                <div className="space-y-2">
                    {['all', ...types].map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="type"
                                value={type}
                                defaultChecked={type === 'all'}
                                onChange={(e) => onFilterChange({ type: e.target.value })}
                                className="w-4 h-4"
                            />
                            <span style={{ color: '#475569' }}>{t[type as keyof typeof t]}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Location Filter */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3" style={{ color: '#334155' }}>
                    {t.location}
                </h4>
                <select
                    onChange={(e) => onFilterChange({ city: e.target.value })}
                    className="input w-full"
                >
                    <option value="all">{t.all}</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3" style={{ color: '#334155' }}>
                    {t.priceRange}
                </h4>
                <select
                    onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                    className="input w-full"
                >
                    <option value="all">{t.all}</option>
                    <option value="0-50000">&lt; 50,000 MUR</option>
                    <option value="50000-100000">50,000 - 100,000 MUR</option>
                    <option value="100000-200000">100,000 - 200,000 MUR</option>
                    <option value="200000">200,000+ MUR</option>
                </select>
            </div>

            {/* Features Filter */}
            <div className="mb-6">
                <h4 className="font-semibold mb-3" style={{ color: '#334155' }}>
                    {t.features}
                </h4>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={(e) => onFilterChange({ hasPool: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <span style={{ color: '#475569' }}>{t.pool}</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={(e) => onFilterChange({ hasBeachfront: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <span style={{ color: '#475569' }}>{t.beachfront}</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            onChange={(e) => onFilterChange({ isFurnished: e.target.checked })}
                            className="w-4 h-4 rounded"
                        />
                        <span style={{ color: '#475569' }}>{t.furnished}</span>
                    </label>
                </div>
            </div>

            {/* Reset Button */}
            <button
                onClick={() => window.location.reload()}
                className="w-full btn-secondary"
            >
                {t.reset}
            </button>
        </div>
    );
}
