const session = require('express-session');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

let app = express();

app.use(cors({origin: true, credentials: true}));
app.options("*", cors({origin: true, credentials: true}));
app.use(bodyParser.json());

const sessionParser = session({
  saveUninitialized: false,
  secret: 'passphrase',
  resave: false
});
app.use(sessionParser);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', (socket, req) => {
  socket.send('Team Aids');

  socket.on('message', (message) => {

    const msg = JSON.parse(message);
    switch (msg.type) {
      case 'TEAM_NAME_INSERTED':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });

        break;
      case 'TEAM_NAME_ACCEPTED':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });

        break;
      case 'TEAM_NAME_NOT_ACCEPTED':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });

        break;
      case 'QUIZZER_START':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });
        break;
      case 'QUIZZER_END':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });
        break;
      case 'QUESTION_SELECT':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });
        break;
      case 'QUESTION_CLOSED':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });
        break;
      case 'ANSWER_SENT':
        theWebSocketServer.clients.forEach((client) => {
          client.send(JSON.stringify({
            type: msg.message
          }));
        });
        break;
      default:
        console.log('Nothing found');
        console.log('Message: ', msg.type);
        break;
      
    }
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(process.env.PORT || 4000, () => {
  console.log('server listening on: ' + server.address().port);

});

module.exports = app;
