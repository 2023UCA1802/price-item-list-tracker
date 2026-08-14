require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const folderRoutes = require('./routes/folders');
const itemRoutes = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/folders', folderRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => res.send('Folder Price Tracker API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
