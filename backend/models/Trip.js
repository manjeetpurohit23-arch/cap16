const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: String,
        required: [true, 'Please specify a destination']
    },
    days: {
        type: Number,
        required: [true, 'Please specify number of days'],
        min: 1,
        max: 30
    },
    budget: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Luxury'],
        required: true
    },
    estimatedCost: {
        type: Number
    },
    itineraryData: {
        type: Object, // Stores JSON coming back from AI
        required: true
    },
    hotels: {
        type: Array, // Stores list of recommended hotels
        default: []
    },
    imageUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trip', tripSchema);
