const express = require('express');
const router = express.Router();
const denialController = require('../controllers/denialController');

router.get('/test', denialController.test);
router.get('/test/db', denialController.testDb);
router.get('/all-denial-codes', denialController.getAllDenialCodes);
router.get('/denial/:code', denialController.getDenialByCode);
router.get('/search', denialController.searchCodes);
router.get('/categories', denialController.getCategories);
router.get('/health', denialController.health);

module.exports = router;