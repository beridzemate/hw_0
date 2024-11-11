import React, { useState } from 'react';

function Contact() {
  const password = 'swordfish';
  const [authorized, setAuthorized] = useState(false);

  function handleSubmit(e) {
    const enteredPassword = e.target.querySelector(
      'input[type="password"]').value;
    const auth = enteredPassword == password;
    setAuthorized(auth)
  }

  return (
      <div id="authorization">
        <h1>Contact</h1>
        <ul>
          <li>
            mateberidze464@gmail.com
          </li>
          <li>
            593.17.38.89
          </li>
        </ul>
      </div>
  );
}

export default Contact;