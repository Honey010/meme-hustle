import { useEffect, useState } from 'react';
import MemeForm from './components/MemeForm';
import MemeGallery from './components/MemeGallery';
import axios from 'axios';
import { io } from 'socket.io-client';

// Use env variable instead of hardcoded localhost
const socket = io(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [memes, setMemes] = useState([]);

  const loadMemes = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`);
      setMemes(res.data);
    } catch (error) {
      console.error('Failed to load memes:', error);
    }
  };

  useEffect(() => {
    //  Wake up Render backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/leaderboard`)
      .catch(err => console.log("Backend wake-up ping failed:", err));
  }, []);

  useEffect(() => {
    loadMemes();

    //  Listen for vote updates
    socket.on('vote-update', () => {
      loadMemes();
    });

    return () => {
      socket.off('vote-update');
    };
  }, []);

  return (
    <div className="font-neon bg-black text-white min-h-screen">...</div>,
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl glitch font-neon text-center">⚡ MemeHustle</h1>
      <MemeForm onMemeCreated={(meme) => setMemes([meme, ...memes])} />
      <MemeGallery memes={memes} refresh={loadMemes} />
    </div>
  );
}

export default App;
