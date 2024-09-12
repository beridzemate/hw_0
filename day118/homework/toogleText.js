import React, { useState } from 'react';

function ToggleText() {
  const [text, setText] = useState("Hello");

  const toggleText = () => {
    setText((prevText) => (prevText === "Hello" ? "Goodbye" : "Hello"));
  };

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={toggleText}>Toggle Text</button>
    </div>
  );
}

export default ToggleText;
