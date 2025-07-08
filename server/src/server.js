const express = require('express');
const { fromEnv } = require('./utils');
 const { logger } = require('./utils');
const connectDB = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
 
const app = express();
const PORT = fromEnv('PORT') || 3001;



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use('/api', routes);




connectDB();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'Aaradhna Backend Service'
  });
});


app.listen(PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});
