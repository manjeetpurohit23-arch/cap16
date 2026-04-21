const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        destination: {
            type: String,
            required: [true, 'Please provide a destination'],
            trim: true,
        },
        duration: {
            type: Number,
            required: [true, 'Please provide trip duration'],
            min: 1,
            max: 30,
        },
        budgetTier: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Luxury'],
            required: true,
        },
        startDate: {
            type: Date,
            required: [true, 'Please provide a start date'],
        },
        endDate: {
            type: Date,
            required: [true, 'Please provide an end date'],
        },
        itinerary: {
            type: Array,
            default: [],
        },
        hotels: {
            type: Array,
            default: [],
        },
        restaurants: {
            type: Array,
            default: [],
        },
        attractions: {
            type: Array,
            default: [],
        },
        weather: {
            type: Object,
            default: null,
        },
        budget: {
            total: Number,
            breakdown: {
                accommodation: Number,
                food: Number,
                transport: Number,
                activities: Number,
            },
        },
        status: {
            type: String,
            enum: ['planning', 'confirmed', 'completed', 'cancelled'],
            default: 'planning',
        },
        travelers: {
            type: Number,
            default: 1,
        },
        notes: {
            type: String,
            maxlength: 1000,
        },
        imageUrl: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
