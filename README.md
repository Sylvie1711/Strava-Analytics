# Strava Year Review

A beautiful, interactive year-in-review dashboard for Strava runners, built with React, Vite, and Node.js.

## 🚀 Features

### Current Implementation
- **OAuth Authentication** with Strava
- **Responsive Dashboard** with modern UI
- **Animated Statistics** with Framer Motion
- **Interactive Charts** using Recharts
  - Monthly distance bar chart
  - Cumulative distance line chart
- **Mobile-First Design** that works on all devices
- **Share Functionality** for social media

### Frontend (React + Vite)
- Built with modern React hooks
- Responsive layout with Tailwind CSS
- Beautiful animations and transitions
- Error handling and loading states
- Modular component architecture

### Backend (Node.js)
- OAuth 2.0 flow with Strava
- API endpoints for user data
- Session management
- Environment-based configuration

## 🛠️ Development Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Sylvie1711/Strava-Analytics.git](https://github.com/Sylvie1711/Strava-Analytics.git)
   cd Strava-Year-Review

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Fill in the required values in the .env file
3. **Install dependencies**
npm install

# Frontend
cd frontend
npm install
cd ..
4. **Run in development**
npm run dev
5. **Build for production**
npm run build
6. **Deploy to Vercel**
vercel --prod


Deployment
The app is configured for deployment on Vercel. The vercel.json file handles routing for both the frontend and API.

Live Demo: https://strava-hazel.vercel.app

📝 Current Status
✅ Completed
OAuth authentication with Strava
Basic user profile display
Responsive dashboard layout
Animated statistics cards
Interactive charts with sample data
Share functionality
Error handling and loading states
🔄 In Progress/TODO
Connect frontend to real Strava activity data
Implement data persistence
Add more detailed activity statistics
Implement user preferences
Add more visualization types
Write tests
Performance optimization
🛠️ Tech Stack
Frontend: React, Vite, Tailwind CSS, Framer Motion, Recharts
Backend: Node.js, Express
Authentication: OAuth 2.0 with Strava
Deployment: Vercel