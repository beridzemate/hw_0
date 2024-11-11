import React, { useState } from 'react';

function ChangeBackgroundColor() {
  const [color, setColor] = useState("white");

  const changeColor = () => {
    const newColor = color === "white" ? "lightblue" : "white";
    setColor(newColor);
  };

  return (
    <div style={{ backgroundColor: color, height: "100px", width: "100px" }}>
      <button onClick={changeColor}>Change Background Color</button>
    </div>
  );
}

export default ChangeBackgroundColor;
