import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNote from './AddNote';

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/notes/USER_ID', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(response.data);
      } catch (err) {
        alert('Failed to fetch notes.');
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <AddNote />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>{note.content} - {note.category}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
