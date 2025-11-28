import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        default: 'contact@example.com',
    },
    phone: {
        type: String,
        default: '+1 (555) 123-4567',
    },
    address: {
        type: String,
        default: '123 Main Street, City, State 12345',
    },
    socialMedia: {
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
        linkedin: { type: String, default: '' },
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
