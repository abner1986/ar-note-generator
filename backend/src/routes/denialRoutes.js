const express = require('express');
const router = express.Router();
const denialController = require('../controllers/denialController');
const authenticateToken = require('../middleware/auth');

// Public routes
router.get('/test', denialController.test);
router.get('/test/db', denialController.testDb);
router.get('/denial/:code', denialController.getDenialByCode);
router.get('/search', denialController.searchCodes);
router.get('/categories', denialController.getCategories);
router.get('/health', denialController.health);

// Protected routes
router.get('/all-denial-codes', authenticateToken, denialController.getAllCodes);

module.exports = router;