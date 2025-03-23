import React, { useState } from 'react';

function NoteItem({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  function handleSave() {
    onUpdate(note.id, { title, content });
    setIsEditing(false);
  }

  return isEditing ? (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  ) : (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>{new Date(note.createdAt).toLocaleString()}</small>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
}

export default NoteItem;