const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json()); 

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use('/tasks', taskRoutes); 

mongoose.connect('mongodb://localhost:27017/task-tracker')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch(err => console.log(err));
