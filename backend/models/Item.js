const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
    date: { type: Date, required: true },
    name: { type: String, trim: true, default: '' }, // optional field
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Index to support efficient newest-first queries (createdAt: -1)
ItemSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Item', ItemSchema);
