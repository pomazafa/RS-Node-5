const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./login/login.router');
const checkToken = require('./middleware/checkToken');
const { requestLog, errorHandle } = require('./logging/logging');
// eslint-disable-next-line node/no-extraneous-require
const bodyparser = require('body-parser');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
  requestLog(req);
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', checkToken, userRouter);
app.use('/boards', checkToken, boardRouter);
app.use('/boards/:boardId/tasks', checkToken, taskRouter);

app.use((err, req, res) => {
  errorHandle(err);
  res.status(err.status).send(err);
});

module.exports = app;
