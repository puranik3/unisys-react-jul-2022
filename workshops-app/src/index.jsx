import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// "App component"
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// The App will re-render when the URL changes (this is because we have put it within BrowserRouter)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);