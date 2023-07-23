const Task = require('../models/task.model.js');
const asyncWrapper = require('../middlewares/asyncWrapper.js');
const CustomAPIError = require('../utils/CustomError.js');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res
    .status(200)
    .json({ status: 'success', data: { total: tasks.length, tasks } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    const error = new CustomAPIError(`No task with id: ${taskID}`, 404);
    return next(error);
  }
  res.status(200).json({ task });
});

const updateTaskById = asyncWrapper(async (req, res) => {
  // alias for req.params
  // PATCH request only requires the fields to be updated

  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    const error = new CustomAPIError(`No task with id: ${taskID}`, 404);
    return next(error);
  }
  res.status(200).json({ task, status: 'success' });
});

const editTaskById = asyncWrapper(async (req, res) => {
  // alias for req.params
  // PUT request requires all fields to be updated

  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    const error = new CustomAPIError(`No task with id: ${taskID}`, 404);
    return next(error);
  }
  res.status(200).json({ task, status: 'success' });
});

const deleteTaskById = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    const error = new CustomAPIError(`No task with id: ${taskID}`, 404);
    return next(error);
  }
  res.status(200).json({ task: task, status: 'success' });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  editTaskById,
  deleteTaskById,
};
