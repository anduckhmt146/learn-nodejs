const Task = require('../models/tasks.js');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res
      .status(200)
      .json({ status: 'success', data: { total: tasks.length, tasks } });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTaskById = async (req, res) => {
  try {
    // alias for req.params
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTaskById = async (req, res) => {
  try {
    // alias for req.params
    // PUT request requires all fields to be updated and PATCH request only requires the fields to be updated

    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const editTaskById = async (req, res) => {
  try {
    // alias for req.params
    // PUT request requires all fields to be updated and PATCH request only requires the fields to be updated

    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    // alias for req.params
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task: task, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  editTaskById,
  deleteTaskById,
};
