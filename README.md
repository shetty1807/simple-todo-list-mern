# MERN Todo List Application

![App Screenshot](images/screenshot.png)

A simple, elegant todo list application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Create new tasks
- ☑️ Mark tasks as complete/incomplete
- 📋 View all tasks
- 🗑️ Delete tasks
- 🎨 Modern, responsive UI

## Project Structure

```
simple-todo-list-mern/
├── images/                 # Screenshots and images
│   └── screenshot.png
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .gitignore          # Git ignore file for client
│   └── package.json
├── server/                 # Node.js/Express backend
│   ├── models/
│   │   └── Task.js
│   ├── .env                # Environment variables (create this)
│   ├── .env.example        # Example environment file
│   ├── .gitignore          # Git ignore file for server
│   ├── server.js
│   └── package.json
├── .gitignore              # Root git ignore file
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance

## Installation

### 1. Clone or create the project structure

### 2. Setup Server

```bash
cd server
npm install
```

**Configure Environment Variables:**

1. Create a `.env` file in the `server` directory
2. Copy the contents from `.env.example`
3. Replace the MongoDB URL with your actual connection string:

```env
MONGODB_URL=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority
```

**Note:** The `.env` file is gitignored to keep your credentials safe.

### 3. Setup Client

```bash
cd ../client
npm install
```

## Running the Application

### Start the Server (from server directory)

```bash
npm start
```

Server runs on `http://localhost:5000`

### Start the Client (from client directory)

```bash
npm start
```

Client runs on `http://localhost:3000`

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Toggle task completion status
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

- **MongoDB** - NoSQL database for storing tasks with flexible document structure
- **Express.js** - Minimal and flexible Node.js web application framework for building REST APIs
- **React** - JavaScript library for building dynamic user interfaces with component-based architecture
- **Node.js** - JavaScript runtime environment that executes JavaScript code server-side
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB, provides schema-based solution
- **Axios** - Promise-based HTTP client for making API requests from React to Express backend
- **CORS** - Middleware to enable Cross-Origin Resource Sharing between frontend and backend
- **dotenv** - Module to load environment variables from .env file for secure configuration

## Development vs Production Architecture

In this project, we run two separate servers during **development**:
- **React Dev Server** (port 3000) - Provides hot reload, fast refresh, and development tools for rapid UI development
- **Express API Server** (port 5000) - Handles backend logic and database operations

However, in **production**, you only need **one server**. Here's why:

When you run `npm run build` in the React app, it compiles all your JSX, CSS, and JavaScript into optimized static files (HTML, CSS, JS bundles). These static files can be served directly by the Express server. There's no need for a separate React development server because React's job is done at build time - it has already transformed your components into plain HTML/CSS/JS files that any web server can deliver to browsers.

This is why MERN apps are typically deployed with the Express server serving both the API routes and the React static files from a single server instance.

## License

This project is open source and available under the MIT License.