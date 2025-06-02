const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const brochureController = require('../controllers/brochureController');

// Validation middleware
const validateBrochureRequest = [
  body('companyName').trim().notEmpty().withMessage('Company name is required'),
  body('websiteUrl')
    .trim()
    .notEmpty()
    .withMessage('Website URL is required')
    .isURL()
    .withMessage('Invalid website URL')
];

// Routes
router.post('/generate', validateBrochureRequest, brochureController.generateBrochure);
router.get('/:id', brochureController.getBrochure);
router.get('/', brochureController.getAllBrochures);

module.exports = router; 