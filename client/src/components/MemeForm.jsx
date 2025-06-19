import React, { useState } from 'react';
import axios from 'axios';

const MemeForm = ({ onMemeCreated }) => {
  const [form, setForm] = useState({ title: '', image_url: '', tags: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map(tag => tag.trim());
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/memes`, {
        ...form,
        tags: tagsArray,
      });
      onMemeCreated(res.data);
      setForm({ title: '', image_url: '', tags: '' });
    } catch (err) {
      alert('Failed to create meme');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg text-white shadow-lg max-w-xl mx-auto mb-6">
      <input type="text" name="title" placeholder="Meme Title" value={form.title} onChange={handleChange} required className="w-full mb-3 p-2 rounded bg-gray-800 border border-pink-500" />
      <input type="text" name="image_url" placeholder="Image URL (optional)" value={form.image_url} onChange={handleChange} className="w-full mb-3 p-2 rounded bg-gray-800 border border-blue-500" />
      <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} required className="w-full mb-3 p-2 rounded bg-gray-800 border border-purple-500" />
      <button type="submit" className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-black font-bold rounded">
         Create Meme
      </button>
    </form>
  );
};

export default MemeForm;
