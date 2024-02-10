const express = require('express');
const { getAnalytics } = require('../controllers/adminController');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.route('/analytics').get(getAnalytics);

module.exports = router;
