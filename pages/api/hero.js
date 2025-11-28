import dbConnect from '@/lib/mongodb';
import Hero from '@/models/Hero';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            let hero = await Hero.findOne();

            // If no hero exists, create default one
            if (!hero) {
                hero = await Hero.create({
                    title: 'Welcome to Our Website',
                    subtitle: 'Your Success Starts Here',
                    description: 'Discover amazing products and services tailored just for you.',
                    ctaText: 'Get Started',
                    ctaLink: '#products',
                });
            }

            res.status(200).json(hero);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch hero content' });
        }
    } else if (req.method === 'PUT') {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const { title, subtitle, description, ctaText, ctaLink, backgroundImage } = req.body;

            let hero = await Hero.findOne();

            if (!hero) {
                hero = await Hero.create(req.body);
            } else {
                hero.title = title;
                hero.subtitle = subtitle;
                hero.description = description;
                hero.ctaText = ctaText;
                hero.ctaLink = ctaLink;
                hero.backgroundImage = backgroundImage || hero.backgroundImage;
                hero.updatedAt = Date.now();
                await hero.save();
            }

            res.status(200).json(hero);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update hero content' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
