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


let commands = []
let users = []
let playerTrackName = ''
let counter = 0;
let playerState = ''

io.on('connection', function (socket) {
  
    let user = socket.handshake.session.userData.body
    users.push(user)
    // console.log(user)
    console.log('a user connected');
    io.emit('server message', `User ${socket.handshake.session.userData.body.display_name} connected.`);
    io.emit('user list', users)
  
    socket.on('disconnect', function () {
      counter = counter - 1
      console.log(chalk.red('user disconnected'));
      users = users.filter(item => item !== user)
      io.emit('user list', users)
      console.log(users)
      io.emit('server message', `User ${socket.handshake.session.userData.body.display_name} disconnected.`);
    });

    socket.on('chat message', function (msg) {
      if (msg.length == 0) {
        return
      }
      console.log(chalk.blue(msg))
      io.emit('chat message', socket.handshake.session.userData.body, msg);
    });

    socket.on('already playing', function(count){
      if(counter >= 1){
        console.log(chalk.red(counter))
        io.emit('state change', playerState)
        io.emit('play')
      } else{
        counter = counter + count
      io.emit('already playing')
      }
    })

    socket.on('state change', function(state) {
      // console.log(playerState)
      if(playerTrackName.length >= 1){
        if(playerTrackName != state.track_window.current_track.name){
          console.log('state change')
          playerState = state
          io.emit('state change', state)
        } else {
          return
        }
      } else {
      playerTrackName = state.track_window.current_track.name
      }
     
    })
});



http.listen(port, function () {
  console.log(`listening on ${port}`);
});