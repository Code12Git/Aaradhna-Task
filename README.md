# 📝 Aradhana Labs Blog Application

A full-stack blog application built for the Aradhana Labs internship assignment, featuring authentication, blog posts, comments, and likes with optional AI integration.

## 🌐 Live Demo (Optional)
🔗 [Deployed Application Link](https://aaradhna-task.vercel.app/login) 

## 🛠️ Tech Stack

### Frontend
- **React** (Functional Components & Hooks)
- **Shadcn/ui** for all components
- **Redux** for state management
- **React Hook Form** for form handling
- **Zod** for schema validation
- **GeminiAI API** integration for title and description suggestions 

### Backend
- **Node.js** + **Express**
- **JWT** for authentication
- **Swagger** for API documentation

### Database
- **MongoDB**

### Devops
- Vercel (Frontend deployment)
- Render (Backend deployment)

## ✨ Features

### Core Features
🔐 **Authentication**
- User sign up & login with password hashing
- JWT-based protected routes

📝 **Blog Posts**
- Create, edit, delete posts (title, content,  image)
- View all posts and individual posts with details

💬 **Comments**
- Authenticated users can comment on posts
- Delete own comments

❤️ **Likes**
- Like/unlike posts
- Visible like count

### Bonus Features 
🤖 **AI Integration**
- Gemini API for blog content suggestions
- "AI Suggestions" button that generates ideas


## 🚀 Installation

### Backend Setup
```bash
cd server
npm install
cp  .env
# Configure your MongoDB credentials
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
cp .env
npm run dev

```

## 📂 Project Structure

```
server/
└── src/
    ├── controllers/         # Route controllers (business logic)
    ├── middleware/          # Custom middleware
    ├── config/          #  Config database (connection)
    |── public/          # Public (e.g., multer file storage)
    ├── models/              # Database models (e.g. Mongoose)
    ├── routes/              # Express route definitions
    ├── services/            # Reusable business logic (blog,auth etc.)
    ├── utils/               # Utility/helper functions
    ├── validations/         # Request data validation schema. (Zod, etc.)
    └── server.js            # Entry point for server (Express setup)


frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images/styles
│   ├── components/ui/       # Shadcn components
│   ├── components/blog/   # Custom components
│   │   ├── BlogCard.tsx     # Post preview
│   ├── components/elements/ #dialog components
│   │   ├── Comment.tsx.     # comment  
│   ├── redux/
│   │   ├── actions/         # Contains all thunk actions
│   │   └── actionTypes/     # Contains all actionTypes
│   │   └── reducers/        # Contains all reducers 
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Contains all routes or pages
│   ├── utils/              # Contains error handler file
│   ├── types/              # Contains all  types
│   ├── validations/        # Contains all  validations using zod
│   ├── App.jsx             # Main router
│   └── main.jsx            # Entry point
└── tailwind.config.js      # UI config

```

## 🤖 AI Integration 
The application uses GeminiAI's API to:

- Suggest blog post titles and descriptions on one click

- Help to generate blog automatically.

### Example prompt:

js
```bash
"Generate exactly ONE blog title and description pair. Follow these rules:\n" +
                            "1. Output format MUST be:\n" +
                            "Title: [generated title]\n" +
                            "Description: [5 sentence description]\n" +
                            "2. Never repeat the same combination\n" +
                            "3. No additional commentary\n" +
                            "4. Cover diverse topics automatically"
```

## 📝 Tech Stack Choices
Why React + Shadcn/ui?
- Shadcn/ui provides accessible, customizable components that match the "clean, respectful UI" requirement

- Perfect for building interfaces suitable for all age groups

## Why Node.js + Express?
- Lightweight and performant for a blog application

- Easy integration with JWT authentication

Why Mongodb?
- Document structure fits blog data well


## ✅ Features Completed

- Full authentication flow

- CRUD operations for blog posts

- Comments system

- Likes functionality

- AI integration

- Responsive design

- Protected routes

## 🔮 Areas for Improvement
- Better image handling for blog posts

- Pagination for blog post listings

- User profiles with avatars

- Social sharing functionality

- Add ai integration which automatically generate image related to title and description of blog.

- Adding unit testing using jest

## 📜 License

This project was created for the Aradhana Labs Full Stack Developer internship assignment.


