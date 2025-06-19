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
      alert(' Failed to create meme');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl text-white shadow-[0_0_20px_rgba(255,0,255,0.3)] max-w-xl mx-auto mb-8 border border-pink-500"
    >
      <h2 className="text-center text-2xl font-bold mb-4 text-pink-400 font-neon"> Create a Meme</h2>

      <input
        type="text"
        name="title"
        placeholder="Meme Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 rounded bg-gray-800 border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <input
        type="text"
        name="image_url"
        placeholder="Image URL (optional)"
        value={form.image_url}
        onChange={handleChange}
        className="w-full mb-3 p-2 rounded bg-gray-800 border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        required
        className="w-full mb-4 p-2 rounded bg-gray-800 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      <button
        type="submit"
        className="w-full py-2 font-bold rounded bg-gradient-to-r from-pink-500 to-purple-600 text-black shadow-[0_0_12px_rgba(255,0,255,0.6)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all duration-300"
      >
        Create Meme
      </button>
    </form>
  );
};

export default MemeForm;
