const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const get = id => usersRepo.get(id);
const update = (id, user) => usersRepo.update(id, user);
const remove = id => usersRepo.remove(id);
const save = user => usersRepo.save(user);

module.exports = { getAll, get, update, remove, save };
