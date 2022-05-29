import React from 'react';
import ReactDOM from 'react-dom/client';
import { LoginProvider } from './context/LoginContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <LoginProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoginProvider>
);
