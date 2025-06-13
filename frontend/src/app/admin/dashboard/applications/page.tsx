'use client';
import { useEffect, useState } from 'react';
import { fetchApplications, updateApplicationStatus } from '@/lib/api';
import { Application } from '@/types';
import toast from 'react-hot-toast';

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    const loadApplications = async () => {
        try {
            const response = await fetchApplications();
            setApplications(response.data);
        } catch (error) {
            toast.error('Failed to load applications.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadApplications();
    }, []);

    const handleStatusUpdate = async (id: number, status: 'ACCEPTED' | 'REJECTED') => {
        try {
            await updateApplicationStatus(id, status);
            toast.success(`Application ${status.toLowerCase()}.`);
            loadApplications();
        } catch {
            toast.error('Failed to update status.');
        }
    };

    if (loading) return <div>Loading applications...</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Submitted Applications</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                                <th className="py-3 px-5 text-left">Applicant</th>
                                <th className="py-3 px-5 text-left">Job Title</th>
                                <th className="py-3 px-5 text-left">Applied At</th>
                                <th className="py-3 px-5 text-left">Resume</th>
                                <th className="py-3 px-5 text-center">Status</th>
                                <th className="py-3 px-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {applications.map(app => (
                                <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-5 text-left">
                                        <p className="font-semibold">{app.fullName}</p>
                                        <p className="text-xs text-gray-500">{app.email}</p>
                                    </td>
                                    <td className="py-3 px-5">{app.job.title}</td>
                                    <td className="py-3 px-5">{new Date(app.appliedAt).toLocaleString()}</td>
                                    <td className="py-3 px-5">
                                        <a href={`${process.env.NEXT_PUBLIC_API_URL}${app.resumePath}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View PDF
                                        </a>
                                    </td>
                                    <td className="py-3 px-5 text-center">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${app.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' : app.status === 'ACCEPTED' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-5 text-center">
                                      {app.status === 'PENDING' && (
                                        <div className="space-x-2">
                                            <button onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')} className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded-full">Accept</button>
                                            <button onClick={() => handleStatusUpdate(app.id, 'REJECTED')} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-full">Reject</button>
                                        </div>
                                      )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {applications.length === 0 && <p className="p-6 text-center text-gray-500">No applications found.</p>}
            </div>
        </div>
    );
}