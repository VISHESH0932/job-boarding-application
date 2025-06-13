import { Job } from '@/types';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const isFull = job._count && job._count.applications >= 5;

  return (
    <div className={`p-6 rounded-lg shadow-lg ${isFull ? 'bg-gray-100' : 'bg-white'}`}>
      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-gray-600 mt-1">{job.department} - {job.location}</p>
      <p className="text-sm text-gray-500 mt-2">
        Posted on: {new Date(job.postingDate).toLocaleDateString()}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-700">
          Applications: {job._count?.applications ?? 0} / 5
        </span>
        {isFull ? (
           <span className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md">
             Closed
           </span>
        ) : (
          <Link
            href={`/jobs/${job.id}`}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            View & Apply
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;