import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { user, isAdmin, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading && (!user || !isAdmin)) {
            navigate('/admin/login');
        }
    }, [user, isAdmin, loading, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl" style={{ color: '#64748b' }}>Chargement...</div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return null;
    }

    async function handleSignOut() {
        await signOut();
        navigate('/admin/login');
    }

    const menuItems = [
        { path: '/admin/dashboard', label: 'Tableau de bord', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { path: '/admin/properties', label: 'Propriétés', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { path: '/admin/properties/new', label: 'Nouvelle propriété', icon: 'M12 4v16m8-8H4' }
    ];

    return (
        <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
            {/* Sidebar */}
            <div className="w-64 glass-dark" style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}>
                <div className="p-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0284c7, #0891b2)' }}>
                            <svg className="w-7 h-7" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold" style={{ color: 'white' }}>PropertyFrank</h1>
                            <p className="text-xs" style={{ color: '#94a3b8' }}>Admin</p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                                    style={isActive
                                        ? { background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }
                                        : { color: '#cbd5e1' }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* User info & logout */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(14, 165, 233, 0.2)' }}>
                                <svg className="w-6 h-6" fill="none" stroke="#38bdf8" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium" style={{ color: 'white' }}>{user.email}</p>
                                <p className="text-xs" style={{ color: '#94a3b8' }}>Administrateur</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                            title="Déconnexion"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
