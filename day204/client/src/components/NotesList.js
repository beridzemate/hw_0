import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onUpdate, onDelete }) {
  return (
    <div>
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NotesList;