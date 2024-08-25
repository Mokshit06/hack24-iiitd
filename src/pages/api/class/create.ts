import prisma from '@/lib/prisma';
import { authOptions } from '@/server/auth';
import { UserRole } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { standard, section } = req.body;

  if (!standard || !section) {
    return res
      .status(400)
      .json({ message: 'Standard and section are required' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id! },
      data: { role: UserRole.TEACHER },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newClass = await prisma.class.create({
      data: {
        standard,
        section,
        users: {
          connect: { id: session.user.id! },
        },
      },
    });

    return res.status(201).json({ class: newClass });
  } catch (error) {
    console.error('Error creating class:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
