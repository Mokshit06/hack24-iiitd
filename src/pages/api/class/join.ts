import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { classId } = req.query;

  if (!classId || typeof classId !== 'string') {
    return res.status(400).json({ message: 'Invalid class ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const classToJoin = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classToJoin) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { classId: classToJoin.id },
    });

    return res
      .status(200)
      .json({ message: 'Successfully joined the class', user: updatedUser });
  } catch (error) {
    console.error('Error joining class:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
