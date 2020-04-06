const express = require('express');
const session = require('express-session')
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
    .use(
        session({
          secret: process.env.SESS_SECRET,
          resave: false,
          saveUninitialized: true,
          cookie: { secure: false, maxAge: 365 * 24 * 60 * 60 * 1000 }
        }))
    .use(express.static('src/public'))
    .use(routing);

io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('disconnect', function(){
          console.log('user disconnected');
        });
});
    


http.listen(port, function(){
    console.log(`listening on ${port}`);
});