import prisma from '@/lib/prisma';
import { authOptions } from '@/server/auth';
import { SubjectEnum } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const { subject, topics } = req.body as Record<string, string | string[]>;
      console.log({ subject, topics });
      if (!subject || !topics || !Array.isArray(topics)) {
        return res.status(400).json({ message: 'Invalid request body' });
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: { class: true },
      });

      if (!user || !user.class) {
        return res.status(400).json({ message: 'User or class not found' });
      }

      const s = await prisma.subject.findFirst({
        where: {
          AND: [{ classid: user.class.id }, { name: subject as SubjectEnum }],
        },
      });

      if (!s) {
        return res.status(400).json({ message: 'Subject not found' });
      }

      await prisma.subject.update({
        where: {
          id: s.id,
        },
        data: {
          topics: JSON.stringify(topics),
        },
      });

      return res.status(200).end();
    } catch (error) {
      console.error('Error updating subject:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    const { subject } = req.query;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: { class: true },
      });

      if (!user || !user.class) {
        return res.status(400).json({ message: 'User or class not found' });
      }

      const s = await prisma.subject.findFirst({
        where: {
          classid: user.class.id,
          name: subject as SubjectEnum,
        },
      });

      return res.status(200).json(s?.topics ?? []);
    } catch {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  res.end();
}
