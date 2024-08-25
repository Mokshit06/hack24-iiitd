import { generateCode } from '@/lib/anthropic';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function p5RouteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  const response = await generateCode(topic as string);
  const code = /<answer>([\s\S]*?)<\/answer>/.exec(response)?.[1];

  if (!code?.trim()) {
    return res.status(400).json({ error: 'Code is required' });
  }

  const markup = `
<html>
<head>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.7.0/lib/p5.js"></script>
</head>
<style>
* {
padding: 0;
margin: 0;
box-sizing: border-box;
}

canvas {
height: 100vh !important;
width: 100vw !important;
object-fit: contain;
}
</style>
<body>
  <script>
    ${code}
  </script>
</body>
</html>
`;

  res.status(200).setHeader('Content-Type', 'text/html').send(markup);
}
