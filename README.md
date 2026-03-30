<div align="center">
  <img width="1200" height="475" alt="Skooture Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  # Skooture.ai - School Management System
  
  **A comprehensive school management platform powered by AI**
  
  [![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-5.22-purple?logo=prisma)](https://prisma.io/)
  [![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey?logo=sqlite)](https://sqlite.org/)
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Running Locally](#-installation--running-locally)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Default Credentials](#-default-credentials)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🎯 Overview

Skooture.ai is a modern school management system designed to streamline administrative tasks, enhance communication, and improve the overall educational experience. Built with a robust **React frontend** and **Node.js backend**, it offers:

- **Bilingual Support**: Full Arabic (RTL) and English support
- **Dark/Light Theme**: Customizable theme preferences
- **Admin Dashboard**: Comprehensive content management
- **Contact Form**: Message collection and management
- **Responsive Design**: Works on all devices

---

## ✨ Features

### Landing Page
- Hero section with video background
- Partner logos showcase
- Traction statistics
- Legacy timeline
- AI Core Features display
- Top Features list
- Customer testimonials
- Pricing plans comparison
- FAQ accordion
- Contact form

### Admin Dashboard
- **Overview**: Statistics, recent messages, quick actions
- **Content Management**: Edit all landing page sections
- **Messages**: View, delete, mark as read
- **Settings**: Language, theme, profile settings
- **Authentication**: JWT-based secure login

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| TailwindCSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| React Router DOM | Routing |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express | Web Framework |
| TypeScript | Type Safety |
| Prisma | ORM |
| SQLite | Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Zod | Validation |

---

## 📁 Project Structure

```
new-skooture-main/
├── src/                          # Frontend source
│   ├── api/
│   │   └── client.ts             # API service layer
│   ├── components/
│   │   ├── admin/
│   │   │   ├── layout/           # AdminHeader, Sidebar, SectionWrapper
│   │   │   ├── sections/         # 12 admin section components
│   │   │   └── shared/           # MediaInput, IconPicker, etc.
│   │   ├── landing/              # All landing page components
│   │   └── shared/               # ProtectedRoute, DynamicIcon
│   ├── constants/
│   │   └── adminSections.ts      # Admin navigation config
│   ├── context/
│   │   ├── ContentContext.tsx    # Content & messages state
│   │   └── ThemeContext.tsx      # Theme state
│   ├── hooks/
│   │   ├── useAdminContent.ts    # Admin content logic
│   │   └── useAuth.ts            # Authentication hook
│   ├── pages/
│   │   ├── Admin.tsx             # Admin dashboard
│   │   ├── Landing.tsx           # Landing page
│   │   └── Login.tsx             # Login page
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
│
├── server/                       # Backend source
│   ├── prisma/
│   │   └── schema.prisma         # Database schema
│   ├── src/
│   │   ├── index.ts              # Express server entry
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT middleware
│   │   ├── routes/
│   │   │   ├── auth.ts           # Authentication routes
│   │   │   ├── content.ts        # Content CRUD routes
│   │   │   └── messages.ts       # Messages routes
│   │   └── seed.ts               # Database seeding
│   ├── default-content.json      # Default content data
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── package.json                  # Frontend package
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** (for cloning)

---

## 🚀 Installation & Running Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd new-skooture-main
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Setup Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
# Default values work for local development
```

### 5. Initialize Database

```bash
# Create database and generate Prisma client
npm run db:push

# Seed database with default content
npm run db:seed
```

### 6. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend Dev Server:**
```bash
# From project root
npm run dev
# Frontend runs on http://localhost:3000
```

### 7. Access the Application

- **Landing Page**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin

---

## 🔐 Environment Variables

### Frontend (`.env` or `.env.local`)

```env
VITE_API_URL=http://localhost:3001/api
VITE_ADMIN_PASSWORD=admin123
```

### Backend (`server/.env`)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="change-this-to-a-random-secret-key"
PORT=3001
ADMIN_EMAIL="admin@skooture.ai"
ADMIN_PASSWORD="admin123"
```

> ⚠️ **Important**: Change `JWT_SECRET` and `ADMIN_PASSWORD` in production!

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | ❌ | Login with email & password |
| GET | `/me` | ✅ | Get current user info |
| GET | `/verify` | ✅ | Verify JWT token |

### Content (`/api/content`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ❌ | Get all content |
| PUT | `/` | ✅ | Update content |
| POST | `/reset` | ✅ | Reset to defaults |

### Messages (`/api/messages`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | ✅ | Get all messages |
| POST | `/` | ❌ | Submit contact form |
| DELETE | `/:id` | ✅ | Delete message |
| PATCH | `/:id/read` | ✅ | Mark as read |

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | ❌ | Server health status |

---

## 🔑 Default Credentials

After running the seed script:

- **Email**: `admin@skooture.ai`
- **Password**: `admin123`

> ⚠️ Change these immediately in production!

---

## 🌐 Deployment

### Option 1: Traditional VPS/Server

#### Backend Deployment

```bash
# 1. Copy server folder to server
scp -r server/ user@your-server:/var/www/skooture-server/

# 2. SSH into server
ssh user@your-server

# 3. Navigate to backend
cd /var/www/skooture-server

# 4. Install dependencies
npm install

# 5. Setup environment
cp .env.example .env
nano .env  # Edit with production values

# 6. Initialize database
npm run db:push
npm run db:seed

# 7. Build TypeScript
npm run build

# 8. Use PM2 for process management
npm install -g pm2
pm2 start dist/index.js --name skooture-api
pm2 save
pm2 startup
```

#### Frontend Deployment

```bash
# 1. Update API URL in .env
VITE_API_URL=https://api.yourdomain.com/api

# 2. Build frontend
npm run build

# 3. Copy dist folder to server
scp -r dist/ user@your-server:/var/www/skooture-frontend/

# 4. Configure Nginx
sudo nano /etc/nginx/sites-available/skooture
```

**Nginx Config Example:**
```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    root /var/www/skooture-frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Docker Deployment

**Backend Dockerfile (`server/Dockerfile`):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npx prisma db push
EXPOSE 3001
CMD ["npm", "start"]
```

**docker-compose.yml (root):**
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - backend
      
  backend:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=file:./data/dev.db
      - JWT_SECRET=your-production-secret
    volumes:
      - ./data:/app/data
```

### Option 3: Platform-as-a-Service

#### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variables

#### Backend (Railway/Render/Fly.io)
1. Connect GitHub repository
2. Set root directory: `server`
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Set environment variables

---

## 📝 License

This project is proprietary software. All rights reserved.

---

## 🤝 Support

For support, email: support@skooture.ai

---

<div align="center">
  Made with ❤️ by Skooture Team
</div>
