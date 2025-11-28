import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const { category, featured } = req.query;
            const filter = {};

            if (category) {
                filter.category = category;
            }

            if (featured === 'true') {
                filter.featured = true;
            }

            const products = await Product.find(filter).sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    } else if (req.method === 'POST') {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
