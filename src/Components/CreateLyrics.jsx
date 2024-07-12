// src/components/CreateLyrics.js
import React, { useState } from 'react';

function CreateLyrics() {
  const [bpm, setBpm] = useState('');
  const [theme, setTheme] = useState('');
  const [mood, setMood] = useState('');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [genre, setGenre] = useState('');
  const [referenceLyrics, setReferenceLyrics] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission and generate lyrics
  };

  return (
    <div>
      <h1>Create Lyrics</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>BPM:</label>
          <input type="number" value={bpm} onChange={(e) => setBpm(e.target.value)} />
        </div>
        <div>
          <label>Theme:</label>
          <input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} />
        </div>
        <div>
          <label>Mood:</label>
          <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} />
        </div>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div>
          <label>Reference Lyrics:</label>
          <textarea value={referenceLyrics} onChange={(e) => setReferenceLyrics(e.target.value)}></textarea>
        </div>
        <button type="submit">Generate Lyrics</button>
        
        <button type="submit">Random Lyrics</button>
      </form>
    </div>
  );
}

export default CreateLyrics;