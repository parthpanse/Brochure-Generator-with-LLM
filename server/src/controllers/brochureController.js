const { validationResult } = require('express-validator');
const axios = require('axios');
const Brochure = require('../models/Brochure');

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || 'http://localhost:5001';

const brochureController = {
  // Generate a new brochure
  async generateBrochure(req, res) {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { companyName, websiteUrl } = req.body;

      // Call Python service to generate brochure
      const response = await axios.post(`${PYTHON_SERVICE_URL}/generate-brochure`, {
        companyName,
        websiteUrl
      });

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to generate brochure');
      }

      // Save to database
      const brochure = new Brochure({
        companyName,
        websiteUrl,
        brochure: response.data.brochure
      });

      await brochure.save();

      res.status(201).json({
        success: true,
        data: brochure
      });

    } catch (error) {
      console.error('Error generating brochure:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate brochure'
      });
    }
  },

  // Get a single brochure by ID
  async getBrochure(req, res) {
    try {
      const brochure = await Brochure.findById(req.params.id);
      
      if (!brochure) {
        return res.status(404).json({
          success: false,
          error: 'Brochure not found'
        });
      }

      res.json({
        success: true,
        data: brochure
      });

    } catch (error) {
      console.error('Error fetching brochure:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch brochure'
      });
    }
  },

  // Get all brochures
  async getAllBrochures(req, res) {
    try {
      const brochures = await Brochure.find()
        .sort({ createdAt: -1 })
        .select('companyName websiteUrl createdAt');

      res.json({
        success: true,
        count: brochures.length,
        data: brochures
      });

    } catch (error) {
      console.error('Error fetching brochures:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch brochures'
      });
    }
  }
};

module.exports = brochureController; 