import { Request, Response } from 'express';
import prisma from '../prisma';
import { Status } from '@prisma/client';

const MAX_APPLICATIONS_PER_JOB = 5;
const MAX_APPLICATIONS_PER_CANDIDATE_24H = 5;

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { postingDate: 'desc' },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    res.json(jobs); 
  } catch (error) {
     res.status(500).json({ message: 'Failed to retrieve jobs', error }); 
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return; 
    }
     res.json(job);
  } catch (error) {
     res.status(500).json({ message: 'Failed to retrieve job', error }); 
  }
};

export const applyForJob = async (req: Request, res: Response): Promise<void> => { 
  const { id } = req.params;
  const { fullName, email, phone, coverLetter } = req.body;

  if (!fullName || !email || !phone) {
    res.status(400).json({ message: 'Full name, email, and phone are required' });
    return;
  }
  if (fullName.length < 2 || fullName.length > 32) {
     res.status(400).json({ message: 'Full name must be between 2 and 32 characters' });
     return;
  }
    if (!req.file) {
     res.status(400).json({ message: 'Resume (PDF) is required' });
     return;
  }

  const jobId = parseInt(id);
   if(isNaN(jobId)){
      res.status(400).json({ message: 'Invalid Job ID' });
     return;
   }


  try {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
       res.status(404).json({ message: 'Job not found' });
       return;
    }

    const applicationCount = await prisma.application.count({ where: { jobId } });
    if (applicationCount >= MAX_APPLICATIONS_PER_JOB) {
       res.status(403).json({ message: 'This job is no longer accepting applications (limit reached)' });
       return;
    }

    const existingApplication = await prisma.application.findUnique({
      where: { unique_application_per_job: { email, jobId } },
    });
    if (existingApplication) {
       res.status(409).json({ message: 'You have already applied for this job' });
       return;
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentApplications = await prisma.application.count({
      where: {
        email,
        appliedAt: { gte: twentyFourHoursAgo },
        status: { not: Status.REJECTED }, 
      },
    });
    if (recentApplications >= MAX_APPLICATIONS_PER_CANDIDATE_24H) {
       res.status(429).json({ message: 'You have reached the application limit (5 per 24 hours)' });
       return;
    }
	
     const resumePath = req.file ? `/uploads/${req.file.filename}` : '';

    const newApplication = await prisma.application.create({
      data: {
        fullName,
        email,
        phone,
        coverLetter,
        resumePath: resumePath, 
        jobId,
      },
    });
    res.status(201).json({ message: 'Application submitted successfully!', application: newApplication }); 
  } catch (error) {
    console.error('Application Error:', error);
    res.status(500).json({ message: 'Failed to submit application', error });
  }
};