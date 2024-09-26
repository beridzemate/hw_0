import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();
const useTheme = () => {
  return useContext(ThemeContext);
};


const DoubleThemeComponent = () => {
    return (
      <ThemeContext.Provider value={{ background: 'lightblue' }}>
        <ThemeContext.Provider value={{ background: 'lightgreen' }}>
          <ThemedComponent />
        </ThemeContext.Provider>
      </ThemeContext.Provider>
    );
  };
  
  const ThemedComponent = () => {
    const theme = useTheme();
    return (
      <div style={{ backgroundColor: theme.background, padding: '20px' }}>
        <h1>Double Provider Example</h1>
      </div>
    );
  };

  


  const ThemeProvider = ({ children, initialTheme }) => {
    return (
      <ThemeContext.Provider value={initialTheme}>
        {children}
      </ThemeContext.Provider>
    );
  };
  