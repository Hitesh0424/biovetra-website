const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Import models
const User = require('../models/User.js').default || require('../models/User.js');
const Hero = require('../models/Hero.js').default || require('../models/Hero.js');
const Product = require('../models/Product.js').default || require('../models/Product.js');
const Contact = require('../models/Contact.js').default || require('../models/Contact.js');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Hero.deleteMany({});
        await Product.deleteMany({});
        await Contact.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
        await User.create({
            email: process.env.ADMIN_EMAIL || 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
        });
        console.log('Created admin user');

        // Create hero content for BIOVETRA
        await Hero.create({
            title: 'BIOVETRA',
            subtitle: 'Your Trusted Partner in Healthcare',
            description: 'Leading pharmaceutical company committed to delivering high-quality medicines and healthcare solutions for a healthier tomorrow.',
            ctaText: 'View Our Products',
            ctaLink: '#products',
        });
        console.log('Created hero content');

        // Create pharmaceutical products
        const products = [
            {
                name: 'Biovetra-CV 625',
                description: 'Amoxicillin 500mg + Clavulanic Acid 125mg - Broad-spectrum antibiotic for bacterial infections.',
                price: 245.00,
                category: 'Antibiotics',
                imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Biovetra-Azith 500',
                description: 'Azithromycin 500mg - Effective treatment for respiratory tract infections and skin infections.',
                price: 180.00,
                category: 'Antibiotics',
                imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Biovetra-D3 60K',
                description: 'Vitamin D3 60,000 IU - Essential for bone health and calcium absorption.',
                price: 85.00,
                category: 'Vitamins & Supplements',
                imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6e8e0b0b3f?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Biovetra-Paracet 650',
                description: 'Paracetamol 650mg - Fast relief from fever, headache, and body pain.',
                price: 45.00,
                category: 'Pain Relief',
                imageUrl: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Biovetra-Gastro',
                description: 'Pantoprazole 40mg - Effective treatment for acidity, GERD, and stomach ulcers.',
                price: 120.00,
                category: 'Gastro Care',
                imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop',
                featured: false,
            },
            {
                name: 'Biovetra-Multivit',
                description: 'Complete multivitamin with minerals - Daily nutritional support for overall health.',
                price: 195.00,
                category: 'Vitamins & Supplements',
                imageUrl: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop',
                featured: false,
            },
            {
                name: 'Biovetra-Cough Syrup',
                description: 'Herbal cough syrup - Natural relief from dry and wet cough, suitable for all ages.',
                price: 95.00,
                category: 'Respiratory Care',
                imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
                featured: false,
            },
            {
                name: 'Biovetra-Calcium Plus',
                description: 'Calcium Carbonate 500mg + Vitamin D3 - Supports strong bones and teeth.',
                price: 150.00,
                category: 'Vitamins & Supplements',
                imageUrl: 'https://images.unsplash.com/photo-1550572017-4a6e8e0b0b3f?w=400&h=300&fit=crop',
                featured: false,
            },
        ];

        await Product.insertMany(products);
        console.log(`Created ${products.length} pharmaceutical products`);

        // Create contact information for BIOVETRA
        await Contact.create({
            email: 'info@biovetra.com',
            phone: '+91 (022) 1234-5678',
            address: 'BIOVETRA Pharmaceuticals Pvt. Ltd., Plot No. 123, Pharmaceutical Zone, Mumbai - 400001, India',
            socialMedia: {
                facebook: 'https://facebook.com/biovetra',
                twitter: 'https://twitter.com/biovetra',
                instagram: 'https://instagram.com/biovetra',
                linkedin: 'https://linkedin.com/company/biovetra',
            },
        });
        console.log('Created contact information');

        console.log('\n✅ Database seeded successfully!');
        console.log('\nAdmin credentials:');
        console.log(`Email: ${process.env.ADMIN_EMAIL || 'admin@example.com'}`);
        console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
