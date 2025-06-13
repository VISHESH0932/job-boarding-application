'use client';
import { useState, FormEvent } from 'react';
import { createJob } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CreateJobPage() {
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createJob({ title, department, location, description });
            toast.success('Job created successfully!');
            setTitle('');
            setDepartment('');
            setLocation('');
            setDescription('');
        } catch {
            toast.error('Failed to create job.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Create New Job Listing</h1>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={6} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
                            {isLoading ? 'Creating...' : 'Create Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}