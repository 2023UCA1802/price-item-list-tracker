const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items belonging to a folder
router.get('/folder/:folderId', async (req, res) => {
  try {
    const items = await Item.find({ folder: req.params.folderId }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an item. date + price are required, name is optional.
router.post('/', async (req, res) => {
  try {
    const { folder, date, name, price } = req.body;
    if (!folder || !date || price === undefined || price === null || price === '') {
      return res.status(400).json({ message: 'folder, date and price are required' });
    }
    if (isNaN(Number(price))) {
      return res.status(400).json({ message: 'price must be a number' });
    }
    const item = await Item.create({
      folder,
      date: new Date(date),
      name: name ? name.trim() : '',
      price: Number(price),
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (edit) an item
router.put('/:id', async (req, res) => {
  try {
    const { date, name, price } = req.body;
    const update = {};

    if (date !== undefined) {
      if (isNaN(new Date(date).getTime())) {
        return res.status(400).json({ message: 'date is invalid' });
      }
      update.date = new Date(date);
    }
    if (name !== undefined) {
      update.name = name.trim();
    }
    if (price !== undefined) {
      if (price === '' || price === null || isNaN(Number(price))) {
        return res.status(400).json({ message: 'price must be a number' });
      }
      update.price = Number(price);
    }

    const item = await Item.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
