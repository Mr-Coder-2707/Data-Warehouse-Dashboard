import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const App: React.FC = () => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;
