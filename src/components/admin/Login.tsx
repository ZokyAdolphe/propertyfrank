import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) throw error;
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #f8fafc, #eff6ff, #ecfeff)' }}>
            <div className="max-w-md w-full mx-4">
                <div className="card p-8">
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0284c7, #0891b2)' }}>
                            <svg className="w-10 h-10" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-center mb-2" style={{ color: '#0f172a' }}>
                        Admin PropertyFrank
                    </h1>
                    <p className="text-center mb-8" style={{ color: '#64748b' }}>
                        Connectez-vous pour gérer les propriétés
                    </p>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg" style={{ background: '#fee2e2', color: '#991b1b' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="admin@propertyfrank.mu"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 font-semibold" style={{ color: '#334155' }}>
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                            style={{ opacity: loading ? 0.5 : 1 }}
                        >
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" style={{ color: '#0284c7' }} className="hover:underline">
                            ← Retour au site
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
