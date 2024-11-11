import React, { useState } from 'react';

function DisableEnableButton() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <button disabled={!isChecked}>Submit</button>
    </div>
  );
}

export default DisableEnableButton;
