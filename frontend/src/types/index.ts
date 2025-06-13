export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  postingDate: string;
  _count?: {
    applications: number;
  };
}

export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface Application {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    resumePath: string;
    coverLetter?: string;
    appliedAt: string;
    status: ApplicationStatus;
    jobId: number;
    job: {
        title: string;
    };
}