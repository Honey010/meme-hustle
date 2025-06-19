# ⚡ MemeHustle

**MemeHustle** is a full-stack meme bidding platform where users can create memes, generate AI captions via Gemini, upvote, bid credits, and climb the leaderboard. Built for small-town Bharat, this project brings fun, interactivity, and competition into meme-sharing.

---

##  Live Links

-  **Frontend** (React + TailwindCSS):  
   [https://memehustle.vercel.app](https://meme-hustle-eosin.vercel.app/)

-  **Backend API** (Node.js + Supabase + Gemini):  
   [https://memehustle-backend.onrender.com](https://meme-hustle-knvh.onrender.com)

>  Note: Backend hosted on free Render plan; may take a few seconds to wake up.

---

##  Features

-  Create memes with title, image URL, and tags
-  Automatically generate captions using Gemini API
-  Upvote & downvote memes (real-time)
-  Bid credits on favorite memes
-  See trending memes on the leaderboard
-  Clean, modern UI using TailwindCSS
-  Real-time updates using Socket.IO

---

##  Tech Stack

### Frontend:
- React (CRA)
- TailwindCSS
- Axios
- Vercel (hosting)

### Backend:
- Node.js + Express
- Supabase (PostgreSQL)
- Google Gemini API (text generation)
- Socket.IO
- Render (hosting)

---

##  Folder Structure

memehustle/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ └── package.json
├── server/ # Express backend
│ ├── utils/
│ ├── index.js
│ └── package.json


---
## ⚙️ Local Setup Instructions

### 1. Clone the Repository

First, clone the project and navigate into the root folder:

```bash
git clone https://github.com/Honey010/meme-hustle.git
cd meme-hustle

2. Setup Backend
```bash
cd server
npm install

Create a .env file in the server/ directory:
- SUPABASE_URL=your_supabase_url
- SUPABASE_KEY=your_anon_key
- GEMINI_API_KEY=your_gemini_api_key

Start the backend:
```bash
node index.js
# Runs on http://localhost:5000

---

3. Setup Frontend
```bash
cd ../client
npm install

Create a .env file in the client/ directory:
REACT_APP_BACKEND_URL=http://localhost:5000

Start the frontend:
npm start
# Runs on http://localhost:3000

---

Test Checklist
 Create meme with title, image, and tags

 Gemini AI generates funny captions

 Upvote/downvote functionality works

 Bidding system updates in real-time

 Leaderboard updates based on upvotes
 
---

Author
Honey Chauhan
B.Tech CSE – IoT (Final Year)
prataphoney3233@gmail.com
GitHub-Profile - https://github.com/Honey010