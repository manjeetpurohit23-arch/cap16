const User = require('../models/User');
const Trip = require('../models/Trip');

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTrips = await Trip.countDocuments();
        
        // Most popular destinations aggregation
        const popularDestinations = await Trip.aggregate([
            { $group: { _id: "$destination", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const recentTrips = await Trip.find().sort('-createdAt').limit(5).populate('user', 'name email');

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalTrips,
                popularDestinations,
                recentTrips
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
