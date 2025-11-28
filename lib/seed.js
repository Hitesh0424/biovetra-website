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

        // Create hero content
        await Hero.create({
            title: 'Welcome to Our Amazing Store',
            subtitle: 'Quality Products, Exceptional Service',
            description: 'Discover our curated collection of premium products designed to enhance your lifestyle.',
            ctaText: 'Explore Products',
            ctaLink: '#products',
        });
        console.log('Created hero content');

        // Create sample products
        const products = [
            {
                name: 'Premium Wireless Headphones',
                description: 'High-quality sound with active noise cancellation and 30-hour battery life.',
                price: 299.99,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Smart Watch Pro',
                description: 'Track your fitness, monitor your health, and stay connected on the go.',
                price: 399.99,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Leather Laptop Bag',
                description: 'Handcrafted genuine leather bag with padded compartments for your devices.',
                price: 149.99,
                category: 'Accessories',
                imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
                featured: false,
            },
            {
                name: 'Ergonomic Office Chair',
                description: 'Premium comfort with lumbar support and adjustable features for all-day productivity.',
                price: 449.99,
                category: 'Furniture',
                imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
                featured: true,
            },
            {
                name: 'Stainless Steel Water Bottle',
                description: 'Keep your drinks cold for 24 hours or hot for 12 hours with this insulated bottle.',
                price: 34.99,
                category: 'Lifestyle',
                imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
                featured: false,
            },
            {
                name: 'Wireless Charging Pad',
                description: 'Fast wireless charging for all Qi-enabled devices with sleek design.',
                price: 49.99,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1591290619762-9b2c0f9c7c0f?w=400&h=300&fit=crop',
                featured: false,
            },
        ];

        await Product.insertMany(products);
        console.log(`Created ${products.length} products`);

        // Create contact information
        await Contact.create({
            email: 'hello@yourstore.com',
            phone: '+1 (555) 987-6543',
            address: '456 Commerce Street, Business District, NY 10001',
            socialMedia: {
                facebook: 'https://facebook.com/yourstore',
                twitter: 'https://twitter.com/yourstore',
                instagram: 'https://instagram.com/yourstore',
                linkedin: 'https://linkedin.com/company/yourstore',
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
