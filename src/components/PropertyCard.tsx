import type { Property } from '../types';
import { useFavorites } from '../hooks/useFavorites';

interface PropertyCardProps {
    property: Property;
    language: 'fr' | 'en';
    onClick: () => void;
}

export default function PropertyCard({ property, language, onClick }: PropertyCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isLiked = isFavorite(property.id);

    const translations = {
        fr: {
            perMonth: '/ mois',
            bedrooms: 'Chambres',
            bathrooms: 'Salles de bain',
            area: 'Surface',
            viewDetails: 'Voir détails',
            available: 'Disponible',
            rented: 'Loué',
            pending: 'En attente',
            beachfront: 'Bord de mer',
            pool: 'Piscine',
            furnished: 'Meublé',
            contactWhatsApp: 'Contacter via WhatsApp'
        },
        en: {
            perMonth: '/ month',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            area: 'Area',
            viewDetails: 'View details',
            available: 'Available',
            rented: 'Rented',
            pending: 'Pending',
            beachfront: 'Beachfront',
            pool: 'Pool',
            furnished: 'Furnished',
            contactWhatsApp: 'Contact via WhatsApp'
        }
    };

    const t = translations[language];

    const statusColors = {
        available: 'bg-emerald-100 text-emerald-800',
        rented: 'bg-slate-100 text-slate-800',
        pending: 'bg-amber-100 text-amber-800'
    };

    const statusText = {
        available: t.available,
        rented: t.rented,
        pending: t.pending
    };

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div
            onClick={onClick}
            className="card card-hover cursor-pointer group"
        >
            {/* Image Gallery */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`badge ${statusColors[property.status]}`}>
                        {statusText[property.status]}
                    </span>
                </div>

                {/* Feature Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {property.features.beachfront && (
                        <span className="badge backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white' }}>
                            🏖️ {t.beachfront}
                        </span>
                    )}
                    {property.features.pool && (
                        <span className="badge backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: 'white' }}>
                            🏊 {t.pool}
                        </span>
                    )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-xl">
                    <div className="text-2xl font-bold" style={{ color: '#0f172a' }}>
                        {formatPrice(property.price, property.currency)}
                    </div>
                    <div className="text-sm" style={{ color: '#475569' }}>{t.perMonth}</div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors" style={{ color: '#0f172a' }}>
                    {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center mb-4" style={{ color: '#475569' }}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{property.location.city}, {property.location.region}</span>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid #f1f5f9' }}>
                    {property.features.bedrooms && (
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                                <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="text-lg font-semibold" style={{ color: '#0f172a' }}>{property.features.bedrooms}</div>
                            <div className="text-xs" style={{ color: '#64748b' }}>{t.bedrooms}</div>
                        </div>
                    )}

                    {property.features.bathrooms && (
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                                <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            </div>
                            <div className="text-lg font-semibold" style={{ color: '#0f172a' }}>{property.features.bathrooms}</div>
                            <div className="text-xs" style={{ color: '#64748b' }}>{t.bathrooms}</div>
                        </div>
                    )}

                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </div>
                        <div className="text-lg font-semibold" style={{ color: '#0f172a' }}>{property.features.area}</div>
                        <div className="text-xs" style={{ color: '#64748b' }}>{property.features.areaUnit}</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {/* Favorite and WhatsApp buttons row */}
                    <div className="flex gap-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(property.id);
                            }}
                            className="flex-1 btn-secondary flex items-center justify-center gap-2"
                            style={isLiked ? { background: '#fee2e2', color: '#dc2626' } : {}}
                        >
                            <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <a
                            href={`https://wa.me/2305123456?text=${encodeURIComponent(`Bonjour, je suis intéressé par: ${property.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 btn-secondary flex items-center justify-center gap-2"
                            style={{ background: '#dcfce7', color: '#059669' }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>

                    {/* View details button */}
                    <button className="w-full btn-primary group-hover:shadow-2xl">
                        {t.viewDetails}
                        <svg className="w-5 h-5 inline-block ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
