const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST /tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PATCH /tasks/:id - Update only the status of a task
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required.' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
        projection: '_id title description assignedTo status priority deadline'
      }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
