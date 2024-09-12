import React, { useState } from 'react';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleParagraph = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={toggleParagraph}>
        {isVisible ? 'Hide Paragraph' : 'Show Paragraph'}
      </button>
      {isVisible && <p>This is a toggleable paragraph!</p>}
    </div>
  );
}

export default App;
