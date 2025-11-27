import { useProperties } from '../../hooks/useProperties';

export default function Dashboard() {
    const { properties, loading } = useProperties();

    const stats = {
        total: properties.length,
        available: properties.filter(p => p.status === 'available').length,
        rented: properties.filter(p => p.status === 'rented').length,
        pending: properties.filter(p => p.status === 'pending').length
    };

    const recentProperties = properties.slice(0, 5);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" style={{ color: '#0f172a' }}>
                Tableau de bord
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium" style={{ color: '#64748b' }}>Total Propriétés</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: '#0f172a' }}>{stats.total}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0284c7, #0891b2)' }}>
                            <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium" style={{ color: '#64748b' }}>Disponibles</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: '#059669' }}>{stats.available}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#d1fae5' }}>
                            <svg className="w-6 h-6" fill="none" stroke="#059669" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium" style={{ color: '#64748b' }}>Louées</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: '#dc2626' }}>{stats.rented}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#fee2e2' }}>
                            <svg className="w-6 h-6" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium" style={{ color: '#64748b' }}>En attente</p>
                            <p className="text-3xl font-bold mt-2" style={{ color: '#f59e0b' }}>{stats.pending}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#fef3c7' }}>
                            <svg className="w-6 h-6" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Properties */}
            <div className="card p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#0f172a' }}>
                    Propriétés récentes
                </h2>
                <div className="space-y-4">
                    {recentProperties.map((property) => (
                        <div key={property.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 sm:border-none">
                            <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                                {property.images[0] && (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                    />
                                )}
                                <div className="min-w-0">
                                    <h3 className="font-semibold truncate pr-4" style={{ color: '#0f172a' }}>{property.title}</h3>
                                    <p className="text-sm truncate" style={{ color: '#64748b' }}>{property.location.city}, {property.location.region}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                                <span className="font-bold" style={{ color: '#0284c7' }}>
                                    {property.price.toLocaleString()} {property.currency}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={
                                        property.status === 'available'
                                            ? { background: '#d1fae5', color: '#059669' }
                                            : property.status === 'rented'
                                                ? { background: '#fee2e2', color: '#dc2626' }
                                                : { background: '#fef3c7', color: '#f59e0b' }
                                    }
                                >
                                    {property.status === 'available' ? 'Disponible' : property.status === 'rented' ? 'Louée' : 'En attente'}
                                </span>
                            </div>
                        </div>
                    ))}
                    {recentProperties.length === 0 && (
                        <p className="text-center text-gray-500 py-4">Aucune propriété récente</p>
                    )}
                </div>
            </div>
        </div>
    );
}
