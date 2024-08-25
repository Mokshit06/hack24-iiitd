import { generateFeedItem } from '@/lib/anthropic';
import { authOptions } from '@/server/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export default async function getFeed(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subject, topic } = req.query;

  if (!subject || !topic) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const feed = await Promise.allSettled([
    generateFeedItem(`${subject}—${topic}`),
    generateFeedItem(`${subject}—${topic}`),
    generateFeedItem(`${subject}—${topic}`),
  ]).then(r => r.filter(i => i.status === 'fulfilled').map(r => r.value));

  return res.status(200).json(feed);
}
