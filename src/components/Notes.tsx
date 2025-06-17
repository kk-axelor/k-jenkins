import React, { useState } from 'react';

interface Note {
  id: number;
  text: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote('');
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="notes-container">
      <h2>My Notes</h2>
      
      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
          data-testid="note-input"
        />
        <button type="submit" data-testid="add-note-button">Add Note</button>
      </form>
      
      {notes.length === 0 ? (
        <p data-testid="no-notes-message">No notes yet. Add one above!</p>
      ) : (
        <ul className="notes-list">
          {notes.map(note => (
            <li key={note.id} className="note-item" data-testid="note-item">
              <span>{note.text}</span>
              <button 
                onClick={() => deleteNote(note.id)}
                className="delete-button"
                aria-label={`Delete note ${note.text}`}
                data-testid="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;