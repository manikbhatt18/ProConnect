ProConnect – Mini LinkedIn-like Community Platform
A minimal community platform inspired by LinkedIn where users can register/login, create posts, and view profiles. Built as a full-stack project for internship assessment.

Features

User Authentication
Register/Login with OTP verification (via email)
User profile with name, email, bio
Public Post Feed
Create and view text-only posts
Feed displays author name & timestamp
Profile Page
View user details and their posts

Extra(made extra for false email checking)

OTP email using Nodemailer
Responsive & clean UI (TailwindCSS)
Protected routes with React Router

Tech Stack
Frontend: React (Vite) + TailwindCSS + React Router + Axios
Backend: Node.js (Express) + MongoDB (Mongoose) + JWT + Nodemailer
Deployment:

Frontend: Vercel

Backend: Render

Live Demo
Frontend (Vercel): https://pro-connect-zeta.vercel.app

Backend API (Render): https://proconnect-zro9.onrender.com/api

Setup Instructions (Local)

1. Clone Repo
git clone https://github.com/manikbhatt18/ProConnect
cd ProConnect

2. Backend Setup

cd server
npm install

Create .env in server/:

PORT=4000
MONGO_URI=<your_mongo_uri>
JWT_SECRET=<your_secret>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_app_password>
Run backend:

node src/server.js

3. Frontend Setup

cd ../client
npm install

Create .env in client/:

VITE_API_URL=http://localhost:4000
Run frontend:
npm run dev

Deployment
Backend (Render)
Set Root Directory to ./server

Build Command: npm install

Start Command: node src/server.js

Add same .env variables in Render settings

Frontend (Vercel)
Set Root Directory to client

Build Command: npm run build

Output Directory: dist

Add VITE_API_URL = Render API URL in Vercel env

Demo Credentials

Email: 60626@gbpuat.ac.in
Password: 123456
