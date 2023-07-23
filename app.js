const express = require('express');
const app = express();
const taskRouter = require('./routes/tasks.js');
const connectDB = require('./db/connect.js');
const notFound = require('./middleware/not-found.js');
require('dotenv').config();

const port = 3000;

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
app.use('/api/v1/tasks', taskRouter);
app.use(notFound);

// Connect to DB and start server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
