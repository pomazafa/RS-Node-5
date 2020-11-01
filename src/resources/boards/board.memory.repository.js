const db = require('../../common/inMemoryDB');
const { Board, BoardSchema } = require('./board.model');
const mongoose = require('mongoose');
const BoardModel = mongoose.model('Board', BoardSchema);
const TaskService = require('../tasks/task.service');
var createError = require('http-errors');

const getAll = async () => {
  return db.getAllEntities(BoardModel);
};

const get = async id => {
  const board = await db.getEntity(BoardModel, id);
  if (!board) {
    throw createError(404, `Board Not found: id=${id}`);
  }
  return board;
};

const remove = async id => {
  if (!(await db.removeEntity(BoardModel, id))) {
    throw createError(500, `Error while removing ${id} board`);
  }
  TaskService.deleteBoardTasks(id);
};

const save = async board => {
  return db.saveEntity(BoardModel, new Board(board));
};

const update = async (id, board) => {
  const entity = await db.updateEntity(BoardModel, id, board);

  if (!entity) {
    console.error(`Board Not found: id=${id}`);
    return;
  }
  return entity;
};

module.exports = { getAll, get, remove, save, update };
