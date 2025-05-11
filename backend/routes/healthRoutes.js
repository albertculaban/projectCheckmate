const express = require('express');
const {
  addHealthLog,
  getHealthLogs,
  updateHealthLog,
  deleteHealthLog
} = require('../controllers/healthController');

const router = express.Router();

// Use controller functions directly for each route
router.post('/', addHealthLog);
router.get('/', getHealthLogs);
router.put('/:id', updateHealthLog);
router.delete('/:id', deleteHealthLog);

module.exports = router;
