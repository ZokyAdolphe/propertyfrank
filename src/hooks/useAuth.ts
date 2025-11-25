import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                checkAdminStatus(session.user.id);
            } else {
                setLoading(false);
            }
        });

        // Listen for auth changes
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                checkAdminStatus(session.user.id);
            } else {
                setIsAdmin(false);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    async function checkAdminStatus(userId: string) {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('role')
                .eq('id', userId)
                .single();

            if (error) {
                setIsAdmin(false);
            } else {
                setIsAdmin(data?.role === 'admin');
            }
        } catch (err) {
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    }

    async function signIn(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    return {
        user,
        isAdmin,
        loading,
        signIn,
        signOut
    };
}
