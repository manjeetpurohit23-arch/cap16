const express = require('express');
const { getTrips, getTrip, generateTrip, deleteTrip } = require('../controllers/tripController');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
    .get(getTrips);

router.route('/generate')
    .post(generateTrip);

router.route('/:id')
    .get(getTrip)
    .delete(deleteTrip);

module.exports = router;
