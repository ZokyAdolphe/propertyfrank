import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import PropertySidebar from './components/PropertySidebar';
import Footer from './components/Footer';
import { useProperties } from './hooks/useProperties';
import type { Property, PropertyType, SearchFilters } from './types';

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const { properties } = useProperties();
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<PropertyType | 'all'>('all');

  // Update filtered properties when properties or filter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(p => p.type === activeFilter));
    }
  }, [properties, activeFilter]);

  const translations = {
    fr: {
      featuredProperties: 'Propriétés en Vedette',
      allProperties: 'Toutes les Propriétés',
      filterBy: 'Filtrer par type',
      all: 'Tous',
      villa: 'Villas',
      house: 'Maisons',
      apartment: 'Appartements',
      office: 'Bureaux',
      furniture: 'Mobilier',
      noResults: 'Aucune propriété trouvée',
      noResultsDesc: 'Essayez de modifier vos critères de recherche',
      aboutTitle: 'Pourquoi Choisir PropertyFrank ?',
      aboutDesc: 'Votre partenaire de confiance pour trouver la propriété idéale à l\'Île Maurice',
      features: [
        {
          title: 'Expertise Locale',
          description: 'Une connaissance approfondie du marché immobilier mauricien'
        },
        {
          title: 'Service Personnalisé',
          description: 'Un accompagnement sur mesure pour expatriés, touristes et entreprises'
        },
        {
          title: 'Portfolio Premium',
          description: 'Une sélection exclusive de propriétés de qualité'
        },
        {
          title: 'Support Multilingue',
          description: 'Service en français et anglais pour votre confort'
        }
      ]
    },
    en: {
      featuredProperties: 'Featured Properties',
      allProperties: 'All Properties',
      filterBy: 'Filter by type',
      all: 'All',
      villa: 'Villas',
      house: 'Houses',
      apartment: 'Apartments',
      office: 'Offices',
      furniture: 'Furniture',
      noResults: 'No properties found',
      noResultsDesc: 'Try adjusting your search criteria',
      aboutTitle: 'Why Choose PropertyFrank?',
      aboutDesc: 'Your trusted partner to find the perfect property in Mauritius',
      features: [
        {
          title: 'Local Expertise',
          description: 'In-depth knowledge of the Mauritian real estate market'
        },
        {
          title: 'Personalized Service',
          description: 'Tailored support for expats, tourists and businesses'
        },
        {
          title: 'Premium Portfolio',
          description: 'An exclusive selection of quality properties'
        },
        {
          title: 'Multilingual Support',
          description: 'Service in French and English for your convenience'
        }
      ]
    }
  };

  const t = translations[language];

  const handleSearch = (filters: any) => {
    let filtered = properties;

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter((p: Property) => p.type === filters.type);
    }

    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter((p: Property) => p.location.city === filters.city);
    }

    if (filters.priceRange && filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter((p: Property) => p.price >= min && p.price <= max);
      } else {
        filtered = filtered.filter((p: Property) => p.price >= min);
      }
    }

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
  };

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />

      <Hero onSearch={handleSearch} language={language} />

      {/* About Section */}
      <section id="about" className="section-container" style={{ background: 'white' }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#0f172a' }}>
            {t.aboutTitle}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#475569' }}>
            {t.aboutDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%)',
                border: '1px solid #bae6fd'
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)'
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#0f172a' }}>{feature.title}</h3>
              <p style={{ color: '#475569' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: '#0f172a' }}>
            {t.featuredProperties}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Hidden on mobile by default, or stacked */}
          <div className="w-full lg:w-1/4">
            <PropertySidebar
              language={language}
              onFilterChange={handleSearch}
            />
          </div>

          {/* Properties Grid */}
          <div className="w-full lg:w-3/4">
            {filteredProperties.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    language={language}
                    onClick={() => handlePropertyClick(property)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <svg className="w-24 h-24 mx-auto text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.noResults}</h3>
                <p className="text-slate-600">{t.noResultsDesc}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 btn-secondary"
                >
                  {t.all}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0891b2 100%)', color: 'white' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: 'white' }}>
            {language === 'fr' ? 'Prêt à Trouver Votre Propriété ?' : 'Ready to Find Your Property?'}
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            {language === 'fr'
              ? 'Contactez-nous dès aujourd\'hui et laissez-nous vous aider à trouver la propriété de vos rêves à l\'Île Maurice.'
              : 'Contact us today and let us help you find your dream property in Mauritius.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+2305123456" className="btn-secondary" style={{ background: 'white', color: '#0369a1' }}>
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +230 5 123 4567
            </a>
            <a href="mailto:contact@propertyfrank.mu" className="btn-secondary" style={{ background: 'white', color: '#0369a1' }}>
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contact@propertyfrank.mu
            </a>
          </div>
        </div>
      </section>

      <Footer language={language} />

      {/* Property Modal */}
      <PropertyModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        language={language}
      />
    </div>
  );
}

export default App;
