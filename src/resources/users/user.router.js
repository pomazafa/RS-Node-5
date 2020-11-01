const router = require('express').Router();
const { User } = require('./user.model');
const usersService = require('./user.service');
const asyncWrapper = require('../../middleware/asyncWrapper');

router
  .route('/')
  .get(
    asyncWrapper(
      asyncWrapper(async (req, res) => {
        const users = await usersService.getAll();
        res.json(users.map(User.toResponse));
      })
    )
  )
  .post(
    asyncWrapper(async (req, res) => {
      const { id, login, name } = await usersService.save(req.body);
      res.json({ id, login, name });
    })
  );
router
  .route('/:id')
  .get(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await usersService.get(id));
    })
  )
  .put(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await usersService.update(id, req.body));
    })
  )
  .delete(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await usersService.remove(id));
    })
  );

module.exports = router;
