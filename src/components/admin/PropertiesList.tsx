import { Link } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { supabase } from '../../lib/supabaseClient';
import { useState } from 'react';

export default function PropertiesList() {
    const { properties, loading, refetch } = useProperties();
    const [deleting, setDeleting] = useState<string | null>(null);

    async function handleDelete(id: string) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
            return;
        }

        try {
            setDeleting(id);
            const { error } = await supabase
                .from('properties')
                .delete()
                .eq('id', id);

            if (error) throw error;

            refetch();
            alert('Propriété supprimée avec succès');
        } catch (err) {
            console.error('Error deleting property:', err);
            alert('Erreur lors de la suppression');
        } finally {
            setDeleting(null);
        }
    }

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>
                    Propriétés ({properties.length})
                </h1>
                <Link to="/admin/properties/new" className="btn-primary">
                    + Nouvelle propriété
                </Link>
            </div>

            <div className="card">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Image</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Titre</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Type</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Localisation</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Prix</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Statut</th>
                                <th className="text-left p-4" style={{ color: '#64748b', fontWeight: 600 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property) => (
                                <tr key={property.id} style={{ borderBottom: '1px solid #f1f5f9' }} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        {property.images[0] && (
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-semibold" style={{ color: '#0f172a' }}>{property.title}</div>
                                        <div className="text-sm" style={{ color: '#64748b' }}>{property.description.substring(0, 50)}...</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                                            {property.type}
                                        </span>
                                    </td>
                                    <td className="p-4" style={{ color: '#475569' }}>
                                        {property.location.city}
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold" style={{ color: '#0284c7' }}>
                                            {property.price.toLocaleString()} {property.currency}
                                        </div>
                                        <div className="text-sm" style={{ color: '#64748b' }}>/ mois</div>
                                    </td>
                                    <td className="p-4">
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
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                to={`/admin/properties/edit/${property.id}`}
                                                className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Modifier"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="#0284c7" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(property.id)}
                                                disabled={deleting === property.id}
                                                className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                title="Supprimer"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="#dc2626" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {properties.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl" style={{ color: '#64748b' }}>Aucune propriété</p>
                            <Link to="/admin/properties/new" className="btn-primary mt-4 inline-block">
                                Créer la première propriété
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
