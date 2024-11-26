import React, { useState } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  const handleSpeechInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(result => result[0].transcript).join('');
      setNewNote(transcript);
    };

    if (!isRecording) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Thinkly: AI-Powered Note-Taking</h1>
      <textarea
        className="w-full border rounded p-2 my-4"
        placeholder="Write your note here..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        rows="5"
      />
      <div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          onClick={handleAddNote}>
          Add Note
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleSpeechInput}>
          {isRecording ? 'Stop Recording' : 'Record Note'}
        </button>
      </div>
      <ul className="mt-6">
        {notes.map((note, index) => (
          <li key={index} className="my-2 p-2 border rounded">{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
