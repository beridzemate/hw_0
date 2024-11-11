import React, { useState } from 'react';

function ShowHideElement() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>This is a paragraph.</p>}
    </div>
  );
}

export default ShowHideElement;
