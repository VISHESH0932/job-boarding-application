import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body;

  if (email === 'admin@example.com' && password === 'admin123') {
    const secret = process.env.JWT_SECRET!;
    const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '8h' });
    
    res.json({ token });
    return;
  }

  res.status(401).json({ message: 'Invalid credentials' });
};

export const createJob = async (req: Request, res: Response): Promise<void> => {
  const { title, department, location, description } = req.body;

  try {
    const job = await prisma.job.create({
      data: { title, department, location, description },
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create job listing.', error });
  }
};

export const getApplications = async (req: Request, res: Response): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      include: { job: { select: { title: true } } },
      orderBy: { appliedAt: 'desc' },
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve applications.', error });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['ACCEPTED', 'REJECTED'].includes(status)) {
    res.status(400).json({ message: 'Invalid status.' });
    return;
  }

  try {
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(updatedApplication);
  } catch (error) {

    res.status(500).json({ message: 'Failed to update application status.', error });
  }
};