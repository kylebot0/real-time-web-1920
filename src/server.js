const express = require('express');
const session = require('express-session')({
  secret: "my-secret",
  resave: true,
  saveUninitialized: true
})
const queryString = require('query-string');
const sharedsession = require('express-socket.io-session');
const chalk = require('chalk');
const routing = require('./routes/routes')
const compression = require('compression')
require('dotenv').config()
const port = process.env.PORT || 3000
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const fetch = require('node-fetch');

app.set('view engine', 'ejs')
  .set('views', 'src/views')
  .use(compression())
  .use(session)
  .use(express.static('src/public'))
  .use(routing);

io.use(sharedsession(session));


let commands = []
let users = []
let queRoom = []
let position = 0
let currentSong = []

io.on('connection', function (socket) {

  let user = socket.handshake.session.userData.body
  users.push(user)
  console.log('a user connected');
  io.emit('server message', `User ${socket.handshake.session.userData.body.display_name} connected.`);
  io.emit('user list', users)

  socket.on('disconnect', function () {
    console.log(chalk.red('user disconnected'));
    let token = socket.token
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
    });
    users = users.filter(item => item !== user)
    io.emit('user list', users)
    console.log(users)
    io.emit('server message', `User ${socket.handshake.session.userData.body.display_name} disconnected.`);
  });

  socket.on('currently playing', async function (token) {
    fetch(
        `https://api.spotify.com/v1/me/player/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        const tracksData = await response.json();
        if (tracksData == currentSong) {
          return
        } else {
          currentSong = tracksData
          socket.emit("currently playing", tracksData);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  })

  socket.on('getSongs', async function (obj) {
    if (queRoom.length == 0) {
      queRoom = obj.que
    } else {
      return
    }
  })

  socket.on('getPosition', async function (obj) {
    if (currentSong.length !== 0) {
      position = currentSong.progress_ms
    } else {
      return
    }
  })

  socket.on('setSong', async function (obj) {
    socket.token = obj.token
    await putSong();
    setTimeout(async () => {
      await fetchSong();
    }, 150)
    queRoom.forEach(async (item, i) => {
      await addToQueue(item);
    })
    async function putSong() {
      await fetch(`https://api.spotify.com/v1/me/player/play`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${obj.token}`,
        },
        body: JSON.stringify({
          uris: [queRoom[0]],
          position_ms: position,
        }),
      }).then(response => {
        return
      })
    }
    async function fetchSong() {
      fetch(
          `https://api.spotify.com/v1/me/player/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${obj.token}`,
            },
          }
        )
        .then(async (response) => {
          const tracksData = await response.json();
          socket.emit("currently playing", tracksData);
          return
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function addToQueue(item) {
      console.log(item)
      let uri = item
      let query = queryString.stringify({
        uri
      })
      await fetch(`https://api.spotify.com/v1/me/player/queue?${query}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${obj.token}`,
        },
      }).then(response => {
        return
      })
    }
  });

  socket.on('pause', function (token) {
    fetch(`https://api.spotify.com/v1/me/player/pause`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      console.log(response)
    });
  })
  socket.on('resume', function (token) {
    fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      console.log(response)
    });
  })
  socket.on('chat message', function (msg) {
    if (msg.length == 0) {
      return
    }
    console.log(chalk.blue(msg))
    io.emit('chat message', socket.handshake.session.userData.body, msg);
  });


});



http.listen(port, function () {
  console.log(`listening on ${port}`);
});