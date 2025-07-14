const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const { fromEnv } = require('./utils');
const { logger } = require('./utils');
const connectDB = require('./config/connection');
const routes = require('./routes');
const cors = require('cors');
 
const app = express();
const PORT = fromEnv('PORT') || 3001;

const allowedOrigins = [
  'https://aaradhna-task.vercel.app/',
  /\.vercel\.app$/, 
  /\.now\.sh$/,    
  'http://localhost:5173', 
  
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
     if (!origin) return callback(null, true);
    
     if (allowedOrigins.some(pattern => {
      if (typeof pattern === 'string') {
        return origin === pattern;
      } else if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return false;
    })) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  logger.info(`Swagger docs at http://localhost:${PORT}/api-docs`);
});
