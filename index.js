const express = require("express");
const bodyParser = require("body-parser");
const http = require('http')
const cors = require("cors");
const socketio =require("socket.io")
const api = require('connect-history-api-fallback')
const db = require('./asset/config/database')
const app = express();

// Routers
const users = require("./asset/routes/users");


const { PORT } = require('./asset/helpers/env')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/image',express.static('./public/image'))

app.use(users)

const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('join-room', (room) => {
    socket.join(room)
  })
  socket.on('get-list-users', (idUser, room) => {
    db.query(`SELECT * FROM users WHERE id != ${idUser}`, (err, result) => {
      io.to(room).emit('res-get-list-users', result)
    })
  })
  socket.on('get-list-chat', (user) => {
    db.query(`SELECT chat.from_id, chat.date, chat.to_id, chat.message, users_from.image as user_image, users_from.name as from_name, users_from.room_id as from_room,users_to.room_id as to_room FROM chat LEFT JOIN users as users_from ON chat.from_id = users_from.id LEFT JOIN users as users_to ON chat.to_id = users_to.id 
    WHERE (from_id='${user.id_from}' AND to_id='${user.id_to}') OR 
    (from_id='${user.id_to}' AND to_id='${user.id_from}')`, (err, result) => {
      io.to(user.room_id).emit('res-get-list-chat', result)
    })
  })
  socket.on('send-message', (data) => {
    db.query(`INSERT INTO chat 
    (from_id, to_id, message) VALUES 
    ('${data.from}','${data.to}','${data.msg}')`, (err, result) => {
      db.query(`SELECT chat.from_id, chat.date, chat.to_id, chat.message, users_from.image as user_image, users_from.name as from_name, users_from.room_id as from_room,users_to.room_id as to_room FROM chat LEFT JOIN users as users_from ON chat.from_id = users_from.id LEFT JOIN users as users_to ON chat.to_id = users_to.id 
      WHERE (from_id='${data.from}' AND to_id='${data.to}') OR 
      (from_id='${data.to}' AND to_id='${data.from}')`, (err, result) => {
        io.to(result[0].from_room).emit('res-get-list-chat', result)
        io.to(result[0].to_room).emit('res-get-list-chat', result)
      })

    })
  })
})
app.use(api({
  verbose:true
}))
app.use('/', express.static('dist'))
server.listen(PORT || 4000, () => {
  console.log(`Service running on PORT ${PORT || 4000}`);
})
