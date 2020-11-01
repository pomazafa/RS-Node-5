const tasksRepo = require('./task.memory.repository');

const getAll = async id => {
  let result = await tasksRepo.getAll();
  return id ? result.filter(task => task.boardId === id) : result;
};
const get = id => tasksRepo.get(id);
const update = (id, task) => tasksRepo.update(id, task);
const remove = id => tasksRepo.remove(id);
const save = task => tasksRepo.save(task);
const deleteBoardTasks = id => tasksRepo.deleteMany(id);

module.exports = { getAll, get, update, remove, save, deleteBoardTasks };
