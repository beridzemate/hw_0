const express = require('express');
const { getAllItems, getItemById, addItem, addItemsBulk } = require('../controllers/itemsController');

const router = express.Router();

// GET /items
router.get('/', getAllItems);

// GET /items/:id
router.get('/:id', getItemById);

// POST /items
router.post('/', addItem);

// POST /items/bulk
router.post('/bulk', addItemsBulk);

module.exports = router;