import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';

export function useFavorites() {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setFavorites([]);
        }
    }, [user]);

    async function fetchFavorites() {
        if (!user) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_favorites')
                .select('property_id')
                .eq('user_id', user.id);

            if (error) throw error;

            setFavorites((data || []).map(f => f.property_id));
        } catch (err) {
            console.error('Error fetching favorites:', err);
        } finally {
            setLoading(false);
        }
    }

    async function toggleFavorite(propertyId: string) {
        if (!user) {
            alert('Veuillez vous connecter pour ajouter des favoris');
            return;
        }

        const isFavorite = favorites.includes(propertyId);

        try {
            if (isFavorite) {
                // Remove from favorites
                const { error } = await supabase
                    .from('user_favorites')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('property_id', propertyId);

                if (error) throw error;
                setFavorites(favorites.filter(id => id !== propertyId));
            } else {
                // Add to favorites
                const { error } = await supabase
                    .from('user_favorites')
                    .insert({
                        user_id: user.id,
                        property_id: propertyId
                    });

                if (error) throw error;
                setFavorites([...favorites, propertyId]);
            }
        } catch (err) {
            console.error('Error toggling favorite:', err);
            alert('Erreur lors de la mise à jour des favoris');
        }
    }

    function isFavorite(propertyId: string) {
        return favorites.includes(propertyId);
    }

    return {
        favorites,
        loading,
        toggleFavorite,
        isFavorite
    };
}
