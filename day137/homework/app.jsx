import React, { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Custom Hook: Form Handling
const useFormInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => setValue(e.target.value);
  const reset = () => setValue(initialValue);
  return { value, onChange: handleChange, reset };
};

// Custom Hook: Window Size Tracking
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom Hook: Data Fetching
const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error fetching data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Custom Hook: Dark Mode Toggle
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('dark-mode')) || false
  );

  useEffect(() => {
    localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

// Custom Hook: Scroll Position Tracking
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

// Custom Hook: Timer
const useTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return { time, start, pause, reset };
};

// Custom Hook: Online Status
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  return isOnline;
};

// Context for Dark Mode
const ThemeContext = createContext();

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const todoInput = useFormInput('');
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const addTodo = () => {
    if (todoInput.value.trim()) {
      setTodos([...todos, { text: todoInput.value, completed: false }]);
      todoInput.reset();
    }
  };

  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <Router>
        <div className={isDarkMode ? 'dark' : 'light'}>
          <nav>
            <Link to="/">Home</Link> | <Link to="/completed">Completed</Link> |{' '}
            <Link to="/active">Active</Link> | <Link to="/settings">Settings</Link>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1>Todo List</h1>
                  <input {...todoInput} placeholder="Add a new task" />
                  <button onClick={addTodo}>Add</button>
                  <div>
                    {filteredTodos.map((todo, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(index)}
                        />
                        <span>{todo.text}</span>
                        <button onClick={() => deleteTodo(index)}>Delete</button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <button onClick={() => setFilter('all')}>All</button>
                    <button onClick={() => setFilter('active')}>Active</button>
                    <button onClick={() => setFilter('completed')}>Completed</button>
                  </div>
                </div>
              }
            />
            <Route
              path="/completed"
              element={
                <div>
                  <h1>Completed Tasks</h1>
                  {todos
                    .filter((todo) => todo.completed)
                    .map((todo, index) => (
                      <div key={index}>{todo.text}</div>
                    ))}
                </div>
              }
            />
            <Route
              path="/active"
              element={
                <div>
                  <h1>Active Tasks</h1>
                  {todos
                    .filter((todo) => !todo.completed)
                    .map((todo, index) => (
                      <div key={index}>{todo.text}</div>
                    ))}
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div>
                  <h1>Settings</h1>
                  <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    Toggle Dark Mode
                  </button>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
