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
      include: { class: { include: { users: true } } },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.class) {
      return res
        .status(404)
        .json({ message: 'User is not assigned to a class' });
    }

    return res.status(200).json({ class: user.class });
  } catch (error) {
    console.error('Error fetching user class:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
