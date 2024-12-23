const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todos');

dotenv.config({path:'../.env'}); // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const app = express();

// Middleware (optional: CORS)
app.use(cors());

app.use('/todos', todoRoutes);

// Routes (will be implemented later)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
