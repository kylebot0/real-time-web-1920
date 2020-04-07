const express = require('express');
const session = require('express-session')({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
})
const sharedsession = require('express-socket.io-session');
const chalk = require('chalk');
const routing = require('./routes/routes')
const compression = require('compression')
require('dotenv').config()
const port = process.env.PORT || 3000
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)


app.set('view engine', 'ejs')
  .set('views', 'src/views')
  .use(compression())
  .use(session)
  .use(express.static('src/public'))
  .use(routing);

io.use(sharedsession(session));

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log(chalk.red('user disconnected'));
  });
  socket.on('chat message', function (msg) {
    if(msg.length == 0){
      return
    }
    console.log(chalk.blue(msg))
    io.emit('chat message', socket.handshake.session.userData.body, msg);
  });
});



http.listen(port, function () {
  console.log(`listening on ${port}`);
});