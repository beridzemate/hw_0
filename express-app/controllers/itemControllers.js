const { readFromFile, writeToFile } = require('../utils/fileOperations');
const path = require('path');
const dataFilePath = path.join(__dirname, '../../items.json');

// Fetch all items
async function getAllItems(req, res) {
    try {
        const items = await readFromFile(dataFilePath);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items.' });
    }
}

// Fetch item by ID
async function getItemById(req, res) {
    try {
        const items = await readFromFile(dataFilePath);
        const item = items.find(item => item.id === parseInt(req.params.id));
        if (!item) return res.status(404).json({ error: 'Item not found.' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch item.' });
    }
}

// Add a new item
async function addItem(req, res) {
    try {
        const { id, name, description } = req.body;
        if (!id || !name || !description) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        const items = await readFromFile(dataFilePath);
        items.push({ id, name, description });
        await writeToFile(dataFilePath, items);
        res.status(201).json({ id, name, description });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add item.' });
    }
}

// Add multiple items
async function addItemsBulk(req, res) {
    try {
        const newItems = req.body;
        if (!Array.isArray(newItems) || newItems.some(item => !item.id || !item.name || !item.description)) {
            return res.status(400).json({ error: 'Invalid items format.' });
        }
        let item = [];
        try {
            items = await readFromFile(dataFilePath);
        } catch (err) {
            push(item);
        }
        const items = await readFromFile(dataFilePath);
        items.push(...newItems);
        await writeToFile(dataFilePath, items);
        res.status(201).json(newItems);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add items.' });
    }
}

module.exports = { getAllItems, getItemById, addItem, addItemsBulk };
