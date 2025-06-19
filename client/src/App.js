import { useEffect, useState } from 'react';
import MemeForm from './components/MemeForm';
import MemeGallery from './components/MemeGallery';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); 

function App() {
  const [memes, setMemes] = useState([]);

  const loadMemes = async () => {
    const res = await axios.get('http://localhost:5000/leaderboard');
    setMemes(res.data);
  };

  useEffect(() => {
    loadMemes();

    // Listen for vote updates
    socket.on('vote-update', () => {
      loadMemes();
    });

    return () => {
      socket.off('vote-update');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-6">⚡ MemeHustle</h1>
      <MemeForm onMemeCreated={(meme) => setMemes([meme, ...memes])} />
      <MemeGallery memes={memes} refresh={loadMemes} />
    </div>
  );
}

export default App;
