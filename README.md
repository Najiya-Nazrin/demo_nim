<div align="center">
  <h1>✨ Nim AI Automation</h1>
  <p><strong>A Next-Generation Full-Stack AI Automation Platform</strong></p>
  
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
</div>

<br />

Nim AI is a powerful CRM and automation platform built specifically for real estate professionals and sales teams. By deeply integrating Google's Generative AI (**Gemini 3.6 Flash**), it automates time-consuming tasks like qualifying leads, drafting responses, and generating marketing copy.

## 🌟 Key Features

- 🤖 **AI Sales Agent**: Automatically analyze incoming lead data (from Facebook, Instagram, Website) and generate a qualified score. Instantly drafts personalized WhatsApp responses based on available properties.
- 💬 **AI Customer Support**: Automatically drafts highly empathetic, professional email responses to customer service tickets (Billing, Technical Issues, etc.) using AI.
- 📢 **AI Marketing Campaigns**: Select a platform, product, and tone to instantly generate ready-to-post marketing copy complete with relevant emojis and hashtags.
- 📊 **Real Estate Database Integration**: AI responses are context-aware and directly query your live Prisma database to suggest available properties matching the user's needs.

---

## 🏗️ Architecture

The project is structured as a monolithic repository containing two distinct applications:

* `/frontend`: A modern, blazing-fast React application built with Vite and TailwindCSS.
* `/backend`: A robust Express.js REST API utilizing Prisma ORM for type-safe database interactions.

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

* **Node.js** (v18.0 or higher)
* **PostgreSQL Database** (We recommend creating a free project on [Supabase](https://supabase.com/))
* **Google Gemini API Key** (Get yours free from [Google AI Studio](https://aistudio.google.com/))

### 1. Backend Setup (API & Database)

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `/backend` directory and add your credentials:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://your_db_user:your_password@your_host:5432/your_database"
   GEMINI_API_KEY="AIzaSyYourGeneratedApiKeyHere..."
   ```
4. Sync your database schema and generate the Prisma Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. *(Optional but Recommended)* Seed your database with sample properties, leads, and tickets:
   ```bash
   npx prisma db seed
   ```
6. Start the Express development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:3000`.*

<br />

### 2. Frontend Setup (UI Dashboard)

1. Open a **second, separate terminal** window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local link (usually `http://localhost:5173`) in your browser to view the application!

> ⚠️ **Important Note:** Always ensure the **backend server is running before** starting or testing the frontend. The dashboard relies heavily on the backend API to load data and interact with the AI models.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License
This project is open-source and available under the MIT License.
