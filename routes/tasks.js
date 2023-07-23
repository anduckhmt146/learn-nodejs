const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  editTaskById,
} = require('../controllers/tasks.js');

//.../api/v1/tasks
router.route('/').get(getAllTasks).post(createTask);
router
  .route('/:id')
  .get(getTaskById)
  .patch(updateTaskById)
  .put(editTaskById)
  .delete(deleteTaskById);

module.exports = router;
