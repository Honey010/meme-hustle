import React, { useState } from 'react';
import axios from 'axios';

const MemeGallery = ({ memes, refresh }) => {
  const [bidAmount, setBidAmount] = useState({});

  const handleVote = async (id, type) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/memes/${id}/vote`, { type });
      refresh(); // reload memes
    } catch (error) {
      console.error('Vote error:', error);
    }
  };

  const handleBidChange = (id, value) => {
    setBidAmount({ ...bidAmount, [id]: value });
  };

  const handleBidSubmit = async (id) => {
    try {
      const credits = parseInt(bidAmount[id] || 0);
      if (credits <= 0 || isNaN(credits)) return alert("Enter valid credits!");

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/memes/${id}/bid`, { credits });
      alert('Bid submitted!');
      setBidAmount({ ...bidAmount, [id]: '' });
    } catch (error) {
      console.error('Bid error:', error);
      alert('Failed to submit bid');
    }
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this meme?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/memes/${id}`,);
    refresh(); // reload updated list
  } catch (error) {
    console.error('Delete failed:', error);
    alert('Failed to delete meme');
  }
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {memes.map((meme) => (
        <div
  key={meme.id}
  className="bg-gray-800 p-4 rounded-xl text-white 
             border border-pink-500 
             shadow-[0_0_15px_rgba(255,0,255,0.6)] 
             hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] 
             transition-all duration-300"
>
          <img
            src={meme.image_url || 'https://picsum.photos/300'}
            alt={meme.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h2 className="text-xl font-bold mb-1">{meme.title}</h2>
          <p className="italic text-sm text-pink-400 mb-2">{meme.caption}</p>
          <p className="text-xs text-gray-300 mb-2">Tags: {meme.tags?.join(', ')}</p>
          <div className="flex items-center justify-between mb-3">
            <button
            onClick={() => handleVote(meme.id, 'up')} className="px-2 py-1 bg-pink-600 text-white rounded hover:shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all duration-200">▲</button>
            <span>{meme.upvotes ?? 0}</span>
            <button onClick={() => handleVote(meme.id, 'down')} className="px-2 py-1 bg-pink-600 text-white rounded hover:shadow-[0_0_8px_rgba(255,0,255,0.8)] transition-all duration-200">▼</button>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              placeholder="Bid"
              value={bidAmount[meme.id] || ''}
              onChange={(e) => handleBidChange(meme.id, e.target.value)}
              className="w-20 px-2 py-1 bg-gray-700 border border-pink-500 rounded text-white text-sm mr-2"
            />
            <button
              onClick={() => handleBidSubmit(meme.id)}
              className="px-2 py-1 bg-yellow-400 text-black font-semibold rounded text-sm"
            >
               Bid
            </button>
          </div>
          <button
            onClick={() => handleDelete(meme.id)}
            className="mt-3 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
           Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemeGallery;
