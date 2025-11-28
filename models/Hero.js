import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Welcome to Our Website',
    },
    subtitle: {
        type: String,
        default: 'Your Success Starts Here',
    },
    description: {
        type: String,
        default: 'Discover amazing products and services tailored just for you.',
    },
    ctaText: {
        type: String,
        default: 'Get Started',
    },
    ctaLink: {
        type: String,
        default: '#products',
    },
    backgroundImage: {
        type: String,
        default: '',
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
