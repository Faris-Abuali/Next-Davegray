import { NextApiRequest, NextApiResponse } from 'next'

// http://localhost:3000/api/revalidate?path=/&secret=53c9c8f86db2c7d2e2ef62bc2ac503f0

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const path = req.query.path as string

    // Revalidate a specific page and regenerate it using On-Demand Incremental Static Regeneration.
    await res.revalidate(path)

    return res.json({ revalidated: true })
}
