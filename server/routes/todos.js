const express = require('express');
const mongoose = require('../models/Todo'); // Assuming models/todos.js created
const multer = require('multer'); // Import multer

const router = express.Router();
const upload = multer(); // You can configure storage options here if needed

// Middleware to parse JSON request bodies
// router.use(express.json());  // This is necessary for parsing JSON data
// router.use(express.urlencoded({ extended: true })); // This will parse x-www-form-urlencoded data
router.use(upload.none());  // This is for handling form fields without files

// Get all to-do items
router.get('/', async (req, res) => {
  try {
    const todos = await mongoose.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create a new to-do item
router.post('/', async (req, res) => {

  const { Task } = req.body; // Assuming request body contains 'Task' property

  if (!Task || Task == 'a') {
    return res.status(400).send('Task is required.'); // Handle error
  }

  const existingTasks = await mongoose.find({'text' : Task});

  if(existingTasks.length > 0 ){
    return res.status(400).send('Task is already added.'); // Handle error
  }
  
  try {
    const newTodo = new mongoose({ text: Task , completed : false});
    await newTodo.save();
    let freshTodos = await mongoose.find();
    res.json(freshTodos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a to-do item (PUT) (assuming ID in URL path)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Task, completed } = req.body; // Assuming request body contains updates

  try {
    const updatedTodo = await mongoose.findByIdAndUpdate(id, { Task, completed }, { new: true });
    if (!updatedTodo) {
      return res.status(404).send('Todo not found');
    }
    let freshTodos = await mongoose.find();
    res.json(freshTodos);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a to-do item (DELETE) (assuming ID in URL path)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await mongoose.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).send('Todo not found');
    }
    let freshTodos = await mongoose.find();
    res.json(freshTodos);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
