const express = require('express');
const { fromEnv } = require('./utils');
const { createServer } = require('node:http'); // HTTP only
const socketIo = require('socket.io');
const { logger } = require('./utils');
const connectDB = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
const SocketService = require('./services/socketService');

const app = express();
const server = createServer(app);
const PORT = fromEnv('PORT') || 3001;



// ✅ Only allow localhost:3000 for CORS (React frontend)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use('/api', routes);

// ✅ Setup Socket.IO to accept connections from localhost:3000
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST"]
  },
  path: '/api/socket.io',
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
  cookie: false
});

// ✅ Initialize your socket service
new SocketService(io);

// ✅ Connect to DB
connectDB().catch(err => {
  logger.error('Database connection failed', err);
  process.exit(1);
});

// ✅ Basic health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Your Service Name'
  });
});

// ✅ Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

app.set('io', io);

// ✅ Start the server
server.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = { server, io };
