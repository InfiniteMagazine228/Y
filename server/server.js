const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { registerUser, loginUser } = require('./auth');
const { saveMessage } = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());

// API đăng ký
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

// API đăng nhập
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const ok = await loginUser(username, password);
  if (ok) res.sendStatus(200);
  else res.sendStatus(401);
});

io.on('connection', (socket) => {
  console.log('Người dùng kết nối');
  socket.on('chat message', async (msg) => {
    await saveMessage(msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Server chạy tại http://localhost:3000');
});
