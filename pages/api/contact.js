import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            let contact = await Contact.findOne();

            // If no contact exists, create default one
            if (!contact) {
                contact = await Contact.create({
                    email: 'contact@example.com',
                    phone: '+1 (555) 123-4567',
                    address: '123 Main Street, City, State 12345',
                    socialMedia: {},
                });
            }

            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch contact info' });
        }
    } else if (req.method === 'PUT') {
        // Check authentication
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const { email, phone, address, socialMedia } = req.body;

            let contact = await Contact.findOne();

            if (!contact) {
                contact = await Contact.create(req.body);
            } else {
                contact.email = email;
                contact.phone = phone;
                contact.address = address;
                contact.socialMedia = socialMedia;
                contact.updatedAt = Date.now();
                await contact.save();
            }

            res.status(200).json(contact);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update contact info' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
