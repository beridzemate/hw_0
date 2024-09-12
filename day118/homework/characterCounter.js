import React, { useState } from 'react';

function CharacterCounter() {
  const [text, setText] = useState("");

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>Character Count: {text.length}</p>
    </div>
  );
}

export default CharacterCounter;
