import { useState } from 'react';
import type { Property } from '../types';

interface PropertyModalProps {
    property: Property | null;
    isOpen: boolean;
    onClose: () => void;
    language: 'fr' | 'en';
}

export default function PropertyModal({ property, isOpen, onClose, language }: PropertyModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showContactForm, setShowContactForm] = useState(false);

    if (!isOpen || !property) return null;

    const translations = {
        fr: {
            close: 'Fermer',
            contact: 'Contacter',
            description: 'Description',
            features: 'Caractéristiques',
            amenities: 'Équipements',
            location: 'Localisation',
            availability: 'Disponibilité',
            availableFrom: 'Disponible à partir du',
            minimumRental: 'Location minimum',
            targetAudience: 'Public cible',
            bedrooms: 'Chambres',
            bathrooms: 'Salles de bain',
            area: 'Surface',
            parking: 'Parking',
            furnished: 'Meublé',
            airConditioning: 'Climatisation',
            pool: 'Piscine',
            beachfront: 'Bord de mer',
            garden: 'Jardin',
            yes: 'Oui',
            no: 'Non',
            contactForm: {
                title: 'Contactez-nous',
                name: 'Nom complet',
                email: 'Email',
                phone: 'Téléphone',
                message: 'Message',
                send: 'Envoyer',
                success: 'Message envoyé avec succès!'
            },
            audiences: {
                local: 'Locaux',
                expat: 'Expatriés',
                tourist: 'Touristes',
                business: 'Entreprises'
            }
        },
        en: {
            close: 'Close',
            contact: 'Contact',
            description: 'Description',
            features: 'Features',
            amenities: 'Amenities',
            location: 'Location',
            availability: 'Availability',
            availableFrom: 'Available from',
            minimumRental: 'Minimum rental',
            targetAudience: 'Target audience',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            area: 'Area',
            parking: 'Parking',
            furnished: 'Furnished',
            airConditioning: 'Air Conditioning',
            pool: 'Pool',
            beachfront: 'Beachfront',
            garden: 'Garden',
            yes: 'Yes',
            no: 'No',
            contactForm: {
                title: 'Contact Us',
                name: 'Full name',
                email: 'Email',
                phone: 'Phone',
                message: 'Message',
                send: 'Send',
                success: 'Message sent successfully!'
            },
            audiences: {
                local: 'Locals',
                expat: 'Expats',
                tourist: 'Tourists',
                business: 'Business'
            }
        }
    };

    const t = translations[language];

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(price);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="min-h-screen px-4 py-8 flex items-center justify-center">
                <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
                    >
                        <svg className="w-6 h-6 text-slate-600 group-hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="overflow-y-auto max-h-[90vh]">
                        {/* Image Gallery */}
                        <div className="relative h-96 bg-slate-900">
                            <img
                                src={property.images[currentImageIndex]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Image Navigation */}
                            {property.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* Image Indicators */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {property.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Price Tag */}
                            <div className="absolute top-4 left-4 glass px-6 py-3 rounded-xl">
                                <div className="text-3xl font-bold text-white">
                                    {formatPrice(property.price, property.currency)}
                                </div>
                                <div className="text-sm text-white/80">/ {language === 'fr' ? 'mois' : 'month'}</div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Title and Location */}
                            <div className="mb-8">
                                <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">{property.title}</h2>
                                <div className="flex items-center text-slate-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{property.location.address}, {property.location.city}, {property.location.region}</span>
                                </div>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                {property.features.bedrooms && (
                                    <div className="text-center p-4 bg-slate-50 rounded-xl">
                                        <div className="text-3xl font-bold text-primary-600 mb-1">{property.features.bedrooms}</div>
                                        <div className="text-sm text-slate-600">{t.bedrooms}</div>
                                    </div>
                                )}
                                {property.features.bathrooms && (
                                    <div className="text-center p-4 bg-slate-50 rounded-xl">
                                        <div className="text-3xl font-bold text-primary-600 mb-1">{property.features.bathrooms}</div>
                                        <div className="text-sm text-slate-600">{t.bathrooms}</div>
                                    </div>
                                )}
                                <div className="text-center p-4 bg-slate-50 rounded-xl">
                                    <div className="text-3xl font-bold text-primary-600 mb-1">{property.features.area}</div>
                                    <div className="text-sm text-slate-600">{property.features.areaUnit}</div>
                                </div>
                                {property.features.parking && (
                                    <div className="text-center p-4 bg-slate-50 rounded-xl">
                                        <div className="text-3xl font-bold text-primary-600 mb-1">{property.features.parking}</div>
                                        <div className="text-sm text-slate-600">{t.parking}</div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.description}</h3>
                                <p className="text-slate-600 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.amenities}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-slate-700">
                                            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-ocean-50 rounded-2xl">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.availability}</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-slate-600 mb-1">{t.availableFrom}</div>
                                        <div className="text-lg font-semibold text-slate-900">
                                            {new Date(property.availableFrom).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                                        </div>
                                    </div>
                                    {property.minimumRental && (
                                        <div>
                                            <div className="text-sm text-slate-600 mb-1">{t.minimumRental}</div>
                                            <div className="text-lg font-semibold text-slate-900">{property.minimumRental}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Button */}
                            <button
                                onClick={() => setShowContactForm(!showContactForm)}
                                className="w-full btn-primary text-lg py-4"
                            >
                                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {t.contact}
                            </button>

                            {/* Contact Form */}
                            {showContactForm && (
                                <div className="mt-6 p-6 glass rounded-2xl animate-slide-down">
                                    <h4 className="text-xl font-bold text-slate-900 mb-4">{t.contactForm.title}</h4>
                                    <form className="space-y-4">
                                        <input type="text" placeholder={t.contactForm.name} className="input" />
                                        <input type="email" placeholder={t.contactForm.email} className="input" />
                                        <input type="tel" placeholder={t.contactForm.phone} className="input" />
                                        <textarea placeholder={t.contactForm.message} rows={4} className="input resize-none"></textarea>
                                        <button type="submit" className="btn-primary w-full">
                                            {t.contactForm.send}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
