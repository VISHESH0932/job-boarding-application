'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Link from 'next/link';

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/admin/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Or a spinner
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
                <nav className="space-y-4">
                    <Link href="/admin/dashboard/applications" className="block py-2 px-4 rounded hover:bg-gray-700">Applications</Link>
                    <Link href="/admin/dashboard/create-job" className="block py-2 px-4 rounded hover:bg-gray-700">Create Job</Link>
                    <button onClick={logout} className="w-full text-left py-2 px-4 rounded hover:bg-gray-700 mt-8">Logout</button>
                </nav>
            </aside>
            <main className="flex-1 p-8 bg-gray-100">
                {children}
            </main>
        </div>
    );
}