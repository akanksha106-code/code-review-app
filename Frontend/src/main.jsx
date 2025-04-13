import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// Import global styles first
import './styles/theme.css';
import './styles/App.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
