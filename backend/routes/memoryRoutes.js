const express = require('express');
const { saveGameData, historyGameData } = require('../controllers/memoryController');
const router = express.Router();

// Route to save game data
router.post('/save', saveGameData);
router.get('/history', historyGameData);

module.exports = router;
