const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aradhana Labs Blog API",
      version: "1.0.0",
      description: `
## 📝 API Documentation

**A complete RESTful API for the Aradhana Labs Blog Application**  
🔐 _JWT Authentication_ | 📝 _CRUD Operations_ | 💬 _Comments & Likes_

### Key Features:
- User registration/login with JWT
- Create, read, update, and delete blog posts
- Commenting system with moderation
- Post liking functionality
- Image upload support

### Built With:
- Node.js & Express
- PostgreSQL database
- JWT authentication
`,
      contact: {
        name: "Aradhana Labs Support",
        email: "life.aradhana@gmail.com"
      },
      license: {
        name: "Internship Project",
        url: "https://github.com/Code12Git/Aaradhna-Task"
      }
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Local development server"
      },
      {
        url: "https://aaradhna-task.onrender.com/",
        description: "Production server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;