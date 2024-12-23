
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env (optional)

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error(err));

module.exports = mongoose; // Export the mongoose connection for use
