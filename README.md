# MERN-App
Portfolio project: MERN App that takes in exercise data. Utilizes MongoDB for storage.

My MERN Stack Application
This is a simple full-stack application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It's designed to help me quickly recall the steps to get the project running on my local machine, and how to troubleshoot common issues.
Table of Contents
Overview
Prerequisites
Getting Started
1. Clone the Repository
2. Install Dependencies
3. Configure Environment Variables
4. Run the Application
Accessing the Application
Troubleshooting
connect ECONNREFUSED ::1:3000 or similar
Overview
This project is a basic MERN stack application. It uses Node.js and Express.js for the backend API, React for the frontend user interface, and MongoDB Atlas for cloud data storage. The application is designed to run locally.
Prerequisites
Before you begin, ensure you have the following installed on your system:
Node.js and npm: You can download them from nodejs.org.
MongoDB Atlas Account: You'll need an account and a cluster set up to get your connection string.
Getting Started
Follow these steps to get the application up and running on your local machine.
1. Clone the Repository
First, clone this repository to your local machine:

Bash


git clone <your-repository-url>
cd <your-project-folder>


Replace <your-repository-url> with the actual URL of your Git repository and <your-project-folder> with the name of the folder your project is in.
2. Install Dependencies
Navigate into your project's root directory and install the necessary npm packages for both the client (frontend) and server (backend).

Bash


# Install server dependencies (from project root)
npm install

# Navigate into the client directory and install client dependencies
cd client
npm install
cd .. # Go back to the project root


3. Configure Environment Variables
Create a file named .env in the root of your project to store sensitive information like your MongoDB connection string and the backend port.
For example, your .env file should look like this:



MONGODB_CONNECT_STRING="mongodb+srv://test:test@cluster0.162dw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
PORT=3000


MONGODB_CONNECT_STRING: Replace the example string with your actual connection string from MongoDB Atlas. Ensure your IP address is whitelisted in MongoDB Atlas Network Access.
PORT: This is the port your Express backend will run on. It's common to use 3000 or 5000.
4. Run the Application
Once all dependencies are installed and .env is configured, you can start both the backend and frontend servers.
Important: You need two separate terminal windows for this.
Terminal 1 (For Backend):
Navigate to the project root directory and start your backend server using Nodemon (for automatic restarts during development):

Bash


npm run dev


You should see output indicating your Express server is starting, typically ending with a message like "Server running on port 3000" and "MongoDB connected successfully!" (if you have that message in your code).
Terminal 2 (For Frontend):
Open a new terminal window, navigate to the client directory, and start your React development server:

Bash


cd client
npm run dev


You should see output confirming Vite is ready, usually showing http://localhost:5173/.
Accessing the Application
After both the backend and frontend servers have started successfully:
The backend API will be running on http://localhost:3000 (based on your .env configuration).
The frontend application will open in your browser, usually at http://localhost:5173/ (as indicated by your Vite output).
You should now be able to interact with your MERN stack application!
Troubleshooting
connect ECONNREFUSED ::1:3000 or similar
This error typically appears in your frontend terminal output and means your React application (running via Vite) cannot connect to your backend server. This is usually due to the backend not running, running on a different port, or issues with its setup.
Common Causes & Solutions:
Backend Server Not Running:
Diagnosis: Did you open a separate terminal for your backend and run npm run dev in the project root?
Solution: Open a new terminal, navigate to your project's root directory, and run npm run dev. Watch for any errors in this terminal.
Backend Not Starting Successfully (Check Backend Terminal Output!):
Diagnosis: If your backend terminal doesn't show "Server running on port 3000" and "MongoDB connected successfully!", there's an issue.
Possible Errors & Solutions:
"Port 3000 already in use": Another process is using port 3000. Close any other applications that might be using it, or change your backend's PORT in .env (and update vite.config.js accordingly).
MongoDB Connection Errors:
Network Access: Ensure your current IP address is whitelisted in your MongoDB Atlas project's Network Access settings.
Credentials: Double-check the username and password in your MONGODB_CONNECT_STRING in .env match your MongoDB Atlas database user.
Connection String: Verify the entire MONGODB_CONNECT_STRING from your .env exactly matches the one provided by MongoDB Atlas (copy-paste it from Atlas's "Connect your application" section).
Code Errors: Look for syntax errors or unhandled exceptions in your server.js or related backend files.
Vite Proxy Mismatch (Frontend Configuration):
Diagnosis: Your frontend's vite.config.js might be configured to look for the backend on the wrong port.
Solution: Open client/vite.config.js. Ensure the target property in your proxy configuration matches the PORT value you set in your backend's .env file (e.g., 3000).
JavaScript
// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Or whatever prefix your API routes use, e.g., '/exercises'
        target: 'http://localhost:3000', // <-- THIS MUST MATCH YOUR BACKEND'S PORT!
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Uncomment if needed
      },
    }
  }
});


Important: After changing vite.config.js, stop and restart your frontend server (Ctrl+C then npm run dev in the frontend terminal).
Frontend Fetch Paths:
Diagnosis: Your React code might be making requests with hardcoded full URLs, bypassing the Vite proxy.
Solution: Ensure your frontend makes API calls using relative paths, letting the Vite proxy handle the full URL.
JavaScript
// Correct (Vite proxy will forward this to http://localhost:3000/api/exercises)
fetch('/api/exercises')

// Incorrect (bypasses proxy, might cause CORS or ECONNREFUSED if backend isn't directly exposed)
// fetch('http://localhost:3000/api/exercises')


By following these steps, you should be able to get your MERN application running smoothly!
Sources
1. https://github.com/wendy-wej/Hng-backend-tasks
