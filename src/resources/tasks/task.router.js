const router = require('express').Router({ mergeParams: true });
const { Task } = require('./task.model');
const tasksService = require('./task.service');
const asyncWrapper = require('../../middleware/asyncWrapper');

router
  .route('/')
  .get(
    asyncWrapper(async (req, res) => {
      const boardId = req.params.boardId;
      const tasks = await tasksService.getAll(boardId);
      res.json(tasks);
    })
  )
  .post(
    asyncWrapper(async (req, res) => {
      const boardId = req.params.boardId;
      if (boardId) {
        req.body.boardId = boardId;
      }
      const task = await tasksService.save(req.body);
      res.json(task);
    })
  );
router
  .route('/:id')
  .get(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      const result = await tasksService.get(id);
      if (result) {
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    })
  )
  .put(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await tasksService.update(id, req.body));
    })
  )
  .delete(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await tasksService.remove(id));
    })
  );

module.exports = router;
