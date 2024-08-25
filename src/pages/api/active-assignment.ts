import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const latestProgress = await prisma.progress.findFirst({
      where: { user_id: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        assignment: true,
      },
    });

    if (!latestProgress) {
      return res.status(404).json({ message: 'No active progress found' });
    }

    return res.status(200).json({
      progress: latestProgress,
      assignment: latestProgress.assignment,
    });
  } catch (error) {
    console.error('Error fetching active assignment:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
