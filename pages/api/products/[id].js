import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    } else if (req.method === 'PUT') {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const product = await Product.findByIdAndUpdate(
                id,
                { ...req.body, updatedAt: Date.now() },
                { new: true, runValidators: true }
            );

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update product' });
        }
    } else if (req.method === 'DELETE') {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
