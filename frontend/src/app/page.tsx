import JobCard from "@/components/JobCard";
import Header from "@/components/Header";
import { fetchJobs } from "@/lib/api";
import { Job } from "@/types";

async function getJobs() {
  try {
    const response = await fetchJobs();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}

export default async function HomePage() {
  const jobs: Job[] = await getJobs();

  return (
    <div>
      <Header />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Open Positions</h1>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No open positions at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  );
}