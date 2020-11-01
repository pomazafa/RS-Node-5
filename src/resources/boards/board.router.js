const router = require('express').Router();
const { Board } = require('./board.model');
const boardsService = require('./board.service');
const asyncWrapper = require('../../middleware/asyncWrapper');

router
  .route('/')
  .get(
    asyncWrapper(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards.map(Board.toResponse));
    })
  )
  .post(
    asyncWrapper(async (req, res) => {
      const board = await boardsService.save(req.body);
      res.json(board);
    })
  );
router
  .route('/:id')
  .get(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      const result = await boardsService.get(id);
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
      res.json(await boardsService.update(id, req.body));
    })
  )
  .delete(
    asyncWrapper(async (req, res) => {
      const id = req.params.id;
      res.json(await boardsService.remove(id));
    })
  );

module.exports = router;
