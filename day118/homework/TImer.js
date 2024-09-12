import React, { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div>
      <h1>Time: {time}s</h1>
      <button onClick={() => setRunning(!running)}>
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

export default Timer;
