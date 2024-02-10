const Trip = require('../models/Trip');
const axios = require('axios');

// @desc    Generate a new trip using AI microservice
// @route   POST /api/trips/generate
exports.generateTrip = async (req, res) => {
    try {
        const { destination, days, budget } = req.body;
        
        if (!destination || !days || !budget) {
            return res.status(400).json({ success: false, error: 'Please provide all details' });
        }

        const PY_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
        
        // Call Python Microservice
        const aiResponse = await axios.post(`${PY_URL}/api/recommendation/generate`, {
            destination,
            days,
            budget
        });
        
        const itineraryData = aiResponse.data;

        // Extract cost from python metadata
        const estimatedCost = itineraryData?.metadata?.total_estimated_cost || 0;

        const trip = await Trip.create({
            user: req.user.id,
            destination,
            days,
            budget,
            estimatedCost,
            itineraryData: itineraryData.itinerary,
            imageUrl: itineraryData.metadata.backdrop_image || ''
        });

        res.status(201).json({
            success: true,
            data: trip
        });

    } catch (err) {
        console.error("Error communicating with AI Service:", err.message);
        res.status(500).json({ success: false, error: 'Failed to generate trip. Please try again later.' });
    }
};

// @desc    Get all trips for logged in user
// @route   GET /api/trips
exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ user: req.user.id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: trips.length,
            data: trips
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
exports.getTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ success: false, error: 'Trip not found' });
        }

        // Make sure user owns trip
        if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized to view this trip' });
        }

        res.status(200).json({
            success: true,
            data: trip
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({ success: false, error: 'Trip not found' });
        }

        if (trip.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Not authorized' });
        }

        await trip.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({ success: false, error: 'Server Error' });
    }
};
