import React, { useState, useEffect } from 'react';

// 1. Simple Counter (useState Only)
function SimpleCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// 2. Change Title with Button Click (useState & useEffect)
function ChangeTitle() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new title"
      />
    </div>
  );
}

// 3. Toggle Visibility (useState Only)
function ToggleVisibility() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'} Text
      </button>
      {visible && <p>This is a toggleable paragraph.</p>}
    </div>
  );
}

// 4. Fetch Data on Mount (useEffect Only)
function FetchDataOnMount() {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return <div>Check the console for fetched data on mount.</div>;
}

// 5. Auto-Increment Counter (useEffect Only)
function AutoIncrementCounter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <div>Auto Increment Counter: {counter}</div>;
}

// 6. Input Tracker (useState & useEffect)
function InputTracker() {
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('Input value changed:', input);
  }, [input]);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Track your input"
      />
    </div>
  );
}

// 7. Window Resize Event (useEffect Only)
function WindowResize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup on unmount
    };
  }, []);

  return <div>Window width: {windowWidth}px</div>;
}

// 8. Button Click Alert (useState & useEffect)
function ButtonClickAlert() {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount === 5) {
      alert('Button clicked 5 times!');
    }
  }, [clickCount]);

  return (
    <div>
      <button onClick={() => setClickCount(clickCount + 1)}>
        Click Me {clickCount}
      </button>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div>
      <h1>React Exercises</h1>
      <h2>1. Simple Counter</h2>
      <SimpleCounter />

      <h2>2. Change Title with Button Click</h2>
      <ChangeTitle />

      <h2>3. Toggle Visibility</h2>
      <ToggleVisibility />

      <h2>4. Fetch Data on Mount</h2>
      <FetchDataOnMount />

      <h2>5. Auto-Increment Counter</h2>
      <AutoIncrementCounter />

      <h2>6. Input Tracker</h2>
      <InputTracker />

      <h2>7. Window Resize Event</h2>
      <WindowResize />

      <h2>8. Button Click Alert</h2>
      <ButtonClickAlert />
    </div>
  );
}

export default App;
