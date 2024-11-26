import React, { useState } from 'react';
import axios from 'axios';

function AddNote() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleAddNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/notes',
        { content, category, userId: 'USER_ID' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Note added!');
      setContent('');
      setCategory('');
    } catch (err) {
      alert('Failed to add note.');
    }
  };

  return (
    <form onSubmit={handleAddNote}>
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNote;
