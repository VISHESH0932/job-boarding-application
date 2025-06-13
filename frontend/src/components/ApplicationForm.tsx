'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { submitApplication } from '@/lib/api';
import toast from 'react-hot-toast';

interface ApplicationFormProps {
    jobId: number;
}

const ApplicationForm = ({ jobId }: ApplicationFormProps) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type !== 'application/pdf') {
                setError('Only PDF files are allowed.');
                setResume(null);
            } else {
                setError('');
                setResume(file);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !phone || !resume) {
            setError('Please fill in all required fields and upload a resume.');
            return;
        }
        if (fullName.length < 2 || fullName.length > 32) {
             setError('Full name must be between 2 and 32 characters.');
            return;
        }

        setError('');
        setIsLoading(true);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('coverLetter', coverLetter);
        formData.append('resume', resume);

        try {
            await submitApplication(String(jobId), formData);
            toast.success('Application submitted successfully!');
            setFullName('');
            setEmail('');
            setPhone('');
            setCoverLetter('');
            setResume(null);
            (document.getElementById('resume-upload') as HTMLInputElement).value = '';
        } catch (err: unknown) {
            let errorMessage = 'An unexpected error occurred.';
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === 'string'
            ) {
                errorMessage = (err as { response: { data: { message: string } } }).response.data.message;
            }
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2} maxLength={32} className="mt-3 block w-full  h-8 px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-3 block w-full h-8 px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-3 block w-full h-8 px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea id="coverLetter" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={4} className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700">Resume (PDF only) *</label>
                <input id="resume-upload" type="file" onChange={handleFileChange} accept=".pdf" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400">
                {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
        </form>
    );
};

export default ApplicationForm;