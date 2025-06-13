import { fetchJobById } from "@/lib/api";
import { Job } from "@/types";
import ApplicationForm from "@/components/ApplicationForm";
import Header from "@/components/Header";
import Link from "next/link";

async function getJob(id: string) {
    try {
        const response = await fetchJobById(id);
        return response.data;
    } catch {
        return null;
    }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
    const job: Job | null = await getJob(params.id);

    if (!job) {
        return (
            <div>
                <Header />
                <div className="container mx-auto px-6 py-8 text-center">
                    <h1 className="text-3xl font-bold">Job Not Found</h1>
                    <p className="mt-4">The job you are looking for does not exist.</p>
                    <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                        Back to all jobs
                    </Link>
                </div>
            </div>
        );
    }
    
    const isFull = job._count && job._count.applications >= 5;

    return (
        <div>
            <Header />
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-gray-800">{job.title}</h1>
                    <p className="text-xl text-gray-600 mt-2">{job.department} - {job.location}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Posted on: {new Date(job.postingDate).toLocaleDateString()}
                    </p>
                    <div className="mt-6 prose max-w-none">
                        <h3 className="font-semibold">Job Description</h3>
                        <p>{job.description}</p>
                    </div>

                    <hr className="my-8" />

                    {isFull ? (
                         <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
                            <h2 className="text-2xl font-bold">Applications Closed</h2>
                            <p>This position has reached the maximum number of applicants.</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Apply for this position</h2>
                            <ApplicationForm jobId={job.id} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}