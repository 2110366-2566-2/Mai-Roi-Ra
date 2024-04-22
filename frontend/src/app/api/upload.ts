import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return res.status(200).json({ message: 'File uploaded successfully' });
  }

  // Only accept POST requests
  return res.status(405).end();
};