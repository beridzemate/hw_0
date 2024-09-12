import React, { useState } from 'react';

function CharacterLimitWarning() {
  const [text, setText] = useState('');
  const characterLimit = 100;
  const warningThreshold = 80;

  const handleChange = (e) => {
    if (e.target.value.length <= characterLimit) {
      setText(e.target.value);
    }
  };

  const remainingCharacters = characterLimit - text.length;

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type your text here..."
        rows="4"
        cols="50"
      />
      <p>
        {remainingCharacters} characters remaining
        {remainingCharacters <= (characterLimit - warningThreshold) && (
          <span style={{ color: 'red' }}> (Approaching the limit!)</span>
        )}
      </p>
    </div>
  );
}

export default CharacterLimitWarning;
