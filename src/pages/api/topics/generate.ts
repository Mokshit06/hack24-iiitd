import { generateTopics } from '@/lib/anthropic';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { subject, standard } = req.query;

  if (
    !subject ||
    typeof subject !== 'string' ||
    !standard ||
    typeof standard !== 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'Subject and standard are required' });
  }

  try {
    const topics = await generateTopics(subject, standard);
    console.log(topics);
    res.status(200).json({ topics });
  } catch (error) {
    console.error('Error generating topics:', error);
    res.status(500).json({ message: 'Error generating topics' });
  }
}
