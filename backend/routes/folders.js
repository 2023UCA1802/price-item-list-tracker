const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const Item = require('../models/Item');

// Create a folder
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    const folder = await Folder.create({ name: name.trim() });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all folders
router.get('/', async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a folder (and all items inside it)
router.delete('/:id', async (req, res) => {
  try {
    await Item.deleteMany({ folder: req.params.id });
    await Folder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Folder deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
