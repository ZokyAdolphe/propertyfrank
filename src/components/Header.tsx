import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onLanguageChange: (lang: 'fr' | 'en') => void;
    currentLanguage: 'fr' | 'en';
}

export default function Header({ onLanguageChange, currentLanguage }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            setIsScrolled(window.scrollY > 20);
        });
    }

    const translations = {
        fr: {
            home: 'Accueil',
            properties: 'Propriétés',
            about: 'À Propos',
            contact: 'Contact',
            login: 'Connexion',
            addProperty: 'Ajouter une propriété'
        },
        en: {
            home: 'Home',
            properties: 'Properties',
            about: 'About',
            contact: 'Contact',
            login: 'Login',
            addProperty: 'Add Property'
        }
    };

    const t = translations[currentLanguage];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 animate-fade-in">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #0284c7, #0891b2)' }}>
                            <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-display font-bold" style={{ background: 'linear-gradient(to right, #0284c7, #0891b2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>PropertyFrank</h1>
                            <p className="text-xs" style={{ color: '#475569' }}>Mauritius Real Estate</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        <a href="#home" className="btn-ghost">{t.home}</a>
                        <a href="#properties" className="btn-ghost">{t.properties}</a>
                        <a href="#about" className="btn-ghost">{t.about}</a>
                        <a href="#contact" className="btn-ghost">{t.contact}</a>
                    </nav>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 rounded-lg p-1" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                            <button
                                onClick={() => onLanguageChange('fr')}
                                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300"
                                style={currentLanguage === 'fr'
                                    ? { background: 'linear-gradient(to right, #0284c7, #0891b2)', color: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                                    : { color: '#475569' }}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => onLanguageChange('en')}
                                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300"
                                style={currentLanguage === 'en'
                                    ? { background: 'linear-gradient(to right, #0284c7, #0891b2)', color: 'white', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }
                                    : { color: '#475569' }}
                            >
                                EN
                            </button>
                        </div>

                        <Link to="/admin/login" className="btn-secondary text-sm">
                            {t.login}
                        </Link>
                        <a href="#contact" className="btn-primary text-sm">
                            + {t.addProperty}
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 glass rounded-2xl p-4 animate-slide-down">
                        <nav className="flex flex-col space-y-2">
                            <a href="#home" className="px-4 py-3 rounded-lg hover:bg-white/50 transition-colors">{t.home}</a>
                            <a href="#properties" className="px-4 py-3 rounded-lg hover:bg-white/50 transition-colors">{t.properties}</a>
                            <a href="#about" className="px-4 py-3 rounded-lg hover:bg-white/50 transition-colors">{t.about}</a>
                            <a href="#contact" className="px-4 py-3 rounded-lg hover:bg-white/50 transition-colors">{t.contact}</a>
                            <div className="flex space-x-2 pt-2">
                                <button
                                    onClick={() => onLanguageChange('fr')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${currentLanguage === 'fr' ? 'bg-primary-600 text-white' : 'bg-white/50'
                                        }`}
                                >
                                    FR
                                </button>
                                <button
                                    onClick={() => onLanguageChange('en')}
                                    className={`flex-1 py-2 rounded-lg text-sm font-medium ${currentLanguage === 'en' ? 'bg-primary-600 text-white' : 'bg-white/50'
                                        }`}
                                >
                                    EN
                                </button>
                            </div>
                            <Link to="/admin/login" className="btn-secondary w-full mt-2 text-center block">{t.login}</Link>
                            <a href="#contact" className="btn-primary w-full text-center block">+ {t.addProperty}</a>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
