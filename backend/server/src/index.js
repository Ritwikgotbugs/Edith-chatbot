const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const socketIo = require('socket.io');
const apiRoutes = require('./routes/api');
const fileRoutes = require('./routes/documents/api');

require('dotenv').config(); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined');
  process.exit(1); 
}

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', 'Server received your message');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(apiRoutes);

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
