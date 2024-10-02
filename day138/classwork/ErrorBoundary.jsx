import React from 'react';
// import ErrorBoundary from './ErrorBoundary';
// import MyComponent from './MyComponent';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <MyComponent />
      </ErrorBoundary>
    </div>
  );
}
export default App;