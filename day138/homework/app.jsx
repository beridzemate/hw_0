import React, { createContext, useState, useContext } from 'react';

// Theme Context and Provider
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// User Authentication Context and Provider
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = () => {
    setIsLoggedIn(true);
    setUser({ name: 'John Doe' });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Language Context and Provider
const LanguageContext = createContext();
const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// App Component to Test All Contexts
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <div>
            {/* Theme Context Test */}
            <ThemeSection />

            {/* User Authentication Context Test */}
            <UserSection />

            {/* Language Context Test */}
            <LanguageSection />
          </div>
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

// Theme Section
const ThemeSection = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <h2>Theme Context</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// User Authentication Section
const UserSection = () => {
  const { isLoggedIn, user, login, logout } = useContext(UserContext);
  return (
    <div>
      <h2>User Authentication Context</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
};

// Language Section
const LanguageSection = () => {
  const { language, switchLanguage } = useContext(LanguageContext);
  const messages = {
    en: 'Hello, world!',
    es: '¡Hola, mundo!',
  };

  return (
    <div>
      <h2>Language Context</h2>
      <p>Current Language: {language}</p>
      <p>{messages[language]}</p>
      <button onClick={switchLanguage}>Switch Language</button>
    </div>
  );
};

export default App;