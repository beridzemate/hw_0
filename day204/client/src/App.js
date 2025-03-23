import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notes when component mounts
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to fetch all notes
  const fetchNotes = () => {
    setIsLoading(true);
    setError(null);
    
    fetch('http://localhost:5000/notes')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched notes:', data);
        setNotes(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching notes:', err);
        setError('Failed to load notes. Please check if server is running.');
        setIsLoading(false);
      });
  };

  // Function to add a new note
  const addNote = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required!');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // This matches the exact structure expected by your backend
    fetch('http://localhost:5000/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: title.trim(), 
        content: content.trim() 
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then(createdNote => {
        console.log('Note added successfully:', createdNote);
        // Add new note to state
        setNotes(prevNotes => [...prevNotes, createdNote]);
        // Clear form fields
        setTitle('');
        setContent('');
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error adding note:', err);
        setError(`Failed to add note: ${err.message}`);
        setIsLoading(false);
      });
  };

  // Function to update an existing note
  const updateNote = (id) => {
    const noteToUpdate = notes.find(note => note.id === id);
    
    if (!noteToUpdate) {
      setError(`Note with ID ${id} not found`);
      return;
    }
    
    const newTitle = prompt('Enter new title:', noteToUpdate.title);
    const newContent = prompt('Enter new content:', noteToUpdate.content);
    
    if (!newTitle || !newContent) {
      return; // User cancelled the operation
    }
    
    // Optimistic update
    const updatedNote = {
      ...noteToUpdate,
      title: newTitle.trim(),
      content: newContent.trim()
    };
    
    // Update UI immediately
    setNotes(prevNotes => 
      prevNotes.map(note => (note.id === id ? updatedNote : note))
    );
    
    // Then update server
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: newTitle.trim(), 
        content: newContent.trim() 
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then(serverUpdatedNote => {
        console.log('Note updated successfully:', serverUpdatedNote);
        // If server returns different data than what we expected, update again
        setNotes(prevNotes => 
          prevNotes.map(note => (note.id === id ? serverUpdatedNote : note))
        );
      })
      .catch(err => {
        console.error('Error updating note:', err);
        setError(`Failed to update note: ${err.message}`);
        // Revert to original data on error
        fetchNotes();
      });
  };

  // Function to delete a note with optimistic UI update
  const deleteNote = (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    // Store the notes before deletion in case we need to revert
    const previousNotes = [...notes];
    
    // Optimistic UI update - remove note immediately
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    
    // Then delete from server
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then(response => {
        console.log('Note deleted successfully:', response);
        // Already updated the UI optimistically, so no need to update state again
      })
      .catch(err => {
        console.error('Error deleting note:', err);
        setError(`Failed to delete note: ${err.message}`);
        
        // Revert to previous state if the server request failed
        setNotes(previousNotes);
      });
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Notes App</h1>
      
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search notes"
          className="search-input"
        />
      </div>
      
      {/* Error message display */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
      
      {/* Add note form */}
      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="form-input"
        />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Content"
          required
          className="form-textarea"
        ></textarea>
        <button 
          type="submit" 
          disabled={isLoading}
          className="form-button"
        >
          {isLoading ? 'Adding...' : 'Add Note'}
        </button>
      </form>
      
      {/* Loading indicator - only show during initial load */}
      {isLoading && notes.length === 0 && (
        <div className="loading">Loading notes...</div>
      )}
      
      {/* Notes display */}
      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <p className="no-notes">No notes found</p>
        ) : (
          filteredNotes.map(note => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
              <div className="note-actions">
                <button 
                  onClick={() => updateNote(note.id)}
                  className="update-button"
                >
                  Update
                </button>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;