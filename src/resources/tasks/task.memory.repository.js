const db = require('../../common/inMemoryDB');
const mongoose = require('mongoose');
const { Task, TaskSchema } = require('./task.model');
const TaskModel = mongoose.model('Task', TaskSchema);
var createError = require('http-errors');

const getAll = async () => {
  return db.getAllEntities(TaskModel);
};

const deleteMany = async id => {
  return await TaskModel.deleteMany({ boardId: id });
};

const get = async id => {
  const task = await db.getEntity(TaskModel, id);
  if (!task) {
    throw createError(404, `Task Not found: id=${id}`);
  }
  return task;
};

const remove = async id => {
  if (!(await db.removeEntity(TaskModel, id))) {
    throw createError(500, `Error while removing ${id} task`);
  }
};

const save = async task => {
  return db.saveEntity(TaskModel, new Task(task));
};

const update = async (id, task) => {
  return await db.updateEntity(TaskModel, id, task);
};

module.exports = { getAll, get, remove, save, update, deleteMany };
