# Nim AI Automation

A full-stack AI-powered automation platform designed for real estate and general customer relationship management. It features AI Lead Qualification, AI Customer Support, and an AI Marketing Campaign generator.

## 🚀 Tech Stack
- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (via Supabase) with Prisma ORM
- **AI Integration**: Google Generative AI (Gemini 3.6 Flash)

## 📁 Project Structure
- `/frontend`: Contains the React web application
- `/backend`: Contains the Express API and Prisma database schemas

## 🛠️ Prerequisites
- Node.js installed (v18+)
- A PostgreSQL Database (Supabase recommended)
- A valid Google Gemini API Key

## ⚙️ Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file in the `/backend` directory. It should include:
   ```env
   PORT=3000
   DATABASE_URL="your-postgresql-url"
   GEMINI_API_KEY="your-google-ai-studio-key"
   ```
4. Generate the Prisma Client and apply migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Optional) You can seed the database with test properties and leads:*
   ```bash
   npx prisma db seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a **new, separate terminal** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed `localhost` link in your browser to view the application!

## ⚠️ Important Note
Always ensure the **backend server is running before** starting or testing the frontend, as the frontend relies on the API to load initial dashboard data.
