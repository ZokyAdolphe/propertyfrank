import { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';

export default function PropertyForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<{ id: string, image_url: string }[]>([]);

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

    useEffect(() => {
        if (id) {
            fetchProperty();
        }
    }, [id]);

    async function fetchProperty() {
        try {
            setLoading(true);
            // Fetch property details
            const { data: property, error: propError } = await supabase
                .from('properties')
                .select('*')
                .eq('id', id)
                .single();

            if (propError) throw propError;

            // Fetch images
            const { data: images, error: imgError } = await supabase
                .from('property_images')
                .select('*')
                .eq('property_id', id)
                .order('display_order');

            if (imgError) throw imgError;

            setFormData({
                title: property.title,
                description: property.description || '',
                type: property.type,
                status: property.status,
                price: property.price.toString(),
                currency: property.currency,
                location_city: property.location_city,
                location_region: property.location_region,
                location_address: property.location_address || '',
                bedrooms: property.bedrooms?.toString() || '',
                bathrooms: property.bathrooms?.toString() || '',
                area: property.area?.toString() || '',
                area_unit: property.area_unit,
                has_pool: property.has_pool,
                has_beachfront: property.has_beachfront,
                is_furnished: property.is_furnished
            });

            setExistingImages(images || []);
        } catch (err) {
            setError('Erreur lors du chargement de la propriété');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e: any) {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function handleImageSelect(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...files]);

            // Create previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    }

    function removeImage(index: number) {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    }

    async function deleteExistingImage(imageId: string) {
        if (!confirm('Voulez-vous vraiment supprimer cette image ?')) return;

        try {
            const { error } = await supabase
                .from('property_images')
                .delete()
                .eq('id', imageId);

            if (error) throw error;

            setExistingImages(prev => prev.filter(img => img.id !== imageId));
        } catch (err) {
            console.error('Error deleting image:', err);
            alert('Erreur lors de la suppression de l\'image');
        }
    }

    async function uploadImages(propertyId: string) {
        if (imageFiles.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = imageFiles.map(async (file, index) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${propertyId}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(filePath);

                return {
                    property_id: propertyId,
                    image_url: publicUrl,
                    display_order: index + existingImages.length
                };
            });

            const uploadedImages = await Promise.all(uploadPromises);

            const { error: dbError } = await supabase
                .from('property_images')
                .insert(uploadedImages);

            if (dbError) throw dbError;

        } catch (err) {
            console.error('Error uploading images:', err);
            throw new Error('Erreur lors de l\'upload des images');
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const propertyData = {
                ...formData,
                price: parseFloat(formData.price),
                bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
                bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
                area: formData.area ? parseFloat(formData.area) : null,
                created_by: user?.id
            };

            let propertyId = id;

            if (id) {
                // Update existing property
                const { error: updateError } = await supabase
                    .from('properties')
                    .update(propertyData)
                    .eq('id', id);

                if (updateError) throw updateError;
            } else {
                // Create new property
                const { data, error: insertError } = await supabase
                    .from('properties')
                    .insert(propertyData)
                    .select()
                    .single();

                if (insertError) throw insertError;
                propertyId = data.id;
            }

            // Upload new images if any
            if (imageFiles.length > 0 && propertyId) {
                await uploadImages(propertyId);
            }

            alert(id ? 'Propriété mise à jour avec succès !' : 'Propriété créée avec succès !');
            navigate('/admin/properties');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold" style={{ color: '#0f172a' }}>
                    {id ? 'Modifier la propriété' : 'Nouvelle propriété'}
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
                    {/* Images Section */}
                    <div className="md:col-span-2 mb-6">
                        <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                            Images
                        </label>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {existingImages.map((img) => (
                                    <div key={img.id} className="relative group">
                                        <img
                                            src={img.image_url}
                                            alt="Property"
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => deleteExistingImage(img.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* New Image Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-full h-32 object-cover rounded-lg border-2 border-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: '#cbd5e1' }}>
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Cliquez pour ajouter des photos</span></p>
                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                />
                            </label>
                        </div>
                    </div>

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
                        disabled={loading || uploading}
                        className="btn-primary"
                        style={{ opacity: (loading || uploading) ? 0.5 : 1 }}
                    >
                        {loading || uploading ? 'Enregistrement...' : (id ? 'Mettre à jour' : 'Créer la propriété')}
                    </button>
                </div>
            </form>
        </div>
    );
}
