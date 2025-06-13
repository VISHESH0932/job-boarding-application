'use client';
import { useState, FormEvent } from 'react';
import { adminLogin } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await adminLogin({ email, password });
            login(response.data.token);
            toast.success('Login successful!');
        } catch {
            setError('Invalid credentials. Please try again.');
            toast.error('Login failed.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Admin Login</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="admin@example.com" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" placeholder="admin123" />
                    </div>
                    <div>
                        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}