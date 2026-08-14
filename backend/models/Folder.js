const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Folder', FolderSchema);
