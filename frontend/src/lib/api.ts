import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchJobs = () => api.get('/api/jobs');
export const fetchJobById = (id: string) => api.get(`/api/jobs/${id}`);
export const submitApplication = (jobId: string, formData: FormData) => 
    api.post(`/api/jobs/${jobId}/apply`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const adminLogin = (credentials: object) => api.post('/api/admin/login', credentials);
export const createJob = (jobData: object) => api.post('/api/admin/jobs', jobData, { headers: getAuthHeader() });
export const fetchApplications = () => api.get('/api/admin/applications', { headers: getAuthHeader() });
export const updateApplicationStatus = (id: number, status: string) => 
    api.patch(`/api/admin/applications/${id}/status`, { status }, { headers: getAuthHeader() });

export default api;