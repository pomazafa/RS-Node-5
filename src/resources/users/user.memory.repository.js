const db = require('../../common/inMemoryDB');
const mongoose = require('mongoose');
const { User, UserSchema } = require('./user.model');
const UserModel = mongoose.model('User', UserSchema);
const TaskService = require('../tasks/task.service');
const taskModel = require('../tasks/task.model');
var createError = require('http-errors');

const getAll = async () => {
  return db.getAllEntities(UserModel);
};

const get = async id => {
  const user = await db.getEntity(UserModel, id);
  if (!user) {
    throw createError(404, `User Not found: id=${id}`);
  }
  return user;
};

const remove = async id => {
  (await TaskService.getAll()).forEach(task => {
    if (task.userId === id) {
      task.userId = null;
      TaskService.update(task.id, task);
    }
  });
  if (!(await db.removeEntity(UserModel, id))) {
    throw createError(500, `Error while removing ${id} user`);
  }
};

const save = async user => {
  return db.saveEntity(UserModel, new User(user));
};

const update = async (id, user) => {
  return await db.updateEntity(UserModel, id, user);
};

module.exports = { getAll, get, remove, save, update };
