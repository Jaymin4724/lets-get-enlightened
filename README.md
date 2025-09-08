
# Let's Get Enlightened

A full-stack web application for meditation, mood tracking, and personal growth. Built to help users improve their mental well-being through guided meditations, challenges, and insightful analytics.

---

## Live Demo :

url : https://drive.google.com/file/d/1di7Swxdjp7WC0NWIsZhIKzRKo6KiJWZY/view?usp=sharing

---

## Tech Stack

- **Frontend**: React, Vite, Recharts, Axios, React Hot Toast
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS Modules

---

## Features

- **User Registration & Authentication**: Secure sign-up, login, and profile management.
- **Meditation Library**: Access a variety of meditation types and track your sessions.
- **Mood Tracking**: Log your mood before and after meditation to visualize your progress.
- **Challenges**: Participate in self-improvement challenges and compete with others.
- **Membership System**: Unlock premium features and content with membership plans.
- **Personal Insights**: View analytics on meditation hours, mood trends, and achievements.
- **Responsive UI**: Modern, mobile-friendly design using React and Vite.
- **Admin Dashboard**: Manage users, content, and reports (for admins).

---

## Project Structure
```
CodeBase_LGE_latest!
│
├── client/                # Frontend (React + Vite)
│   ├── public/            # (if exists) Static assets for frontend
│   ├── src/               # Source code
│   │   ├── assets/        # Images, audio, and other static files
│   │   ├── components/    # Reusable React components (by feature/page)
│   │   ├── context/       # React context providers (Auth, Theme, etc.)
│   │   ├── data/          # Static data files
│   │   ├── pages/         # Main app pages (by feature)
│   │   ├── index.css      # Global styles
│   │   ├── Index.jsx      # App entry component
│   │   └── main.jsx       # React app bootstrap
│   ├── index.html         # Main HTML file
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite config
│
├── server/                # Backend (Node.js + Express)
│   ├── controllers/       # Route logic for each feature
│   ├── models/            # Mongoose models (MongoDB schemas)
│   ├── routes/            # Express route definitions
│   ├── index.js           # Server entry point
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables (not committed)
│
├── concepts.md            # Key concepts and architecture notes
└── README.md              # Project overview and instructions
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB

### Installation
1. **Clone the repository:**
	 ```bash
	 git clone https://github.com/Jaymin4724/lets-get-enlightened.git
	 cd lets-get-enlightened/CodeBase_LGE_latest!
	 ```
2. **Install dependencies:**
	 - For client:
		 ```bash
		 cd client
		 npm install
		 ```
	 - For server:
		 ```bash
		 cd ../server
		 npm install
		 ```
3. **Set up environment variables:**
	 - Create a `.env` file in the `server` folder with your MongoDB URI and any secrets.

4. **Run the app:**
	 - Start backend:
		 ```bash
		 npm start
		 ```
	 - Start frontend (in a new terminal):
		 ```bash
		 cd ../client
		 npm run dev
		 ```

---
