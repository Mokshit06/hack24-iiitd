import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
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

      const savedReels = await prisma.saved.findMany({
        where: { userId: user.id },
        include: { reel: true },
      });

      return res.status(200).json(savedReels);
    } catch (error) {
      console.error('Error fetching saved reels:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { saved, title, content, username, subreddit } = req.body as Record<
    string,
    string | undefined
  >;

  if (!title || !content || !username || !subreddit) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingReel = await prisma.reel.findFirst({
      where: {
        title,
        content,
        username,
        subreddit,
      },
    });

    if (existingReel) {
      const existingSaved = await prisma.saved.findFirst({
        where: {
          userId: user.id,
          reelId: existingReel.id,
        },
      });

      if (existingSaved) {
        if (!saved) {
          await prisma.saved.delete({
            where: { id: existingSaved.id },
          });
          return res.status(200).json({ message: 'Reel unsaved successfully' });
        }
        return res.status(200).json({ message: 'Reel already saved' });
      } else if (saved) {
        await prisma.saved.create({
          data: {
            userId: user.id,
            reelId: existingReel.id,
          },
        });
        return res.status(200).json({ message: 'Reel saved successfully' });
      }
    } else if (saved) {
      const newReel = await prisma.reel.create({
        data: {
          title,
          content,
          username,
          subreddit,
        },
      });

      await prisma.saved.create({
        data: {
          userId: user.id,
          reelId: newReel.id,
        },
      });

      return res
        .status(201)
        .json({ message: 'Reel created and saved successfully' });
    }

    return res.status(200).json({ message: 'No action taken' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
