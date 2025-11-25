import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';

export default function PropertyForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'villa' as 'villa' | 'house' | 'apartment' | 'office',
        status: 'available' as 'available' | 'rented' | 'pending',
        price: '',
        currency: 'MUR',
        location_city: '',
        location_region: '',
        location_address: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        area_unit: 'm²',
        has_pool: false,
        has_beachfront: false,
        is_furnished: false
    });

    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: insertError } = await supabase
                .from('properties')
                .insert({
                    ...formData,
                    price: parseFloat(formData.price),
                    bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
                    bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
                    area: formData.area ? parseFloat(formData.area) : null,
                    created_by: user?.id
                });

            if (insertError) throw insertError;

            alert('Propriété créée avec succès !');
            navigate('/admin/properties');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>
                    Nouvelle propriété
                </h1>
                <button onClick={() => navigate('/admin/properties')} className="btn-secondary">
                    Annuler
                </button>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ background: '#fee2e2', color: '#991b1b' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Titre *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input"
                            rows={4}
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Type *
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="villa">Villa</option>
                            <option value="house">Maison</option>
                            <option value="apartment">Appartement</option>
                            <option value="office">Bureau</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Statut *
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input"
                            required
                        >
                            <option value="available">Disponible</option>
                            <option value="rented">Louée</option>
                            <option value="pending">En attente</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Prix (par mois) *
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    {/* Currency */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Devise
                        </label>
                        <select
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="MUR">MUR</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>

                    {/* City */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Ville *
                        </label>
                        <input
                            type="text"
                            name="location_city"
                            value={formData.location_city}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    {/* Region */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Région *
                        </label>
                        <input
                            type="text"
                            name="location_region"
                            value={formData.location_region}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Adresse
                        </label>
                        <input
                            type="text"
                            name="location_address"
                            value={formData.location_address}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Bedrooms */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Chambres
                        </label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Bathrooms */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Salles de bain
                        </label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Area */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Surface
                        </label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Area Unit */}
                    <div>
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Unité
                        </label>
                        <select
                            name="area_unit"
                            value={formData.area_unit}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="m²">m²</option>
                            <option value="sqft">sqft</option>
                        </select>
                    </div>

                    {/* Features */}
                    <div className="md:col-span-2">
                        <label className="block mb-4 font-semibold" style={{ color: '#334155' }}>
                            Caractéristiques
                        </label>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="has_pool"
                                    checked={formData.has_pool}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded"
                                />
                                <span style={{ color: '#475569' }}>Piscine</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="has_beachfront"
                                    checked={formData.has_beachfront}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded"
                                />
                                <span style={{ color: '#475569' }}>Bord de mer</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_furnished"
                                    checked={formData.is_furnished}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded"
                                />
                                <span style={{ color: '#475569' }}>Meublé</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/properties')}
                        className="btn-secondary"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary"
                        style={{ opacity: loading ? 0.5 : 1 }}
                    >
                        {loading ? 'Création...' : 'Créer la propriété'}
                    </button>
                </div>
            </form>
        </div>
    );
}
