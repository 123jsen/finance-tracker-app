import React, { useState, useEffect } from 'react';
import LoginForm from './pages/Login.jsx';
import Main from './pages/Main.jsx';

export default function App() {

  const [login, setLogin] = useState(true);

  useEffect(() => {
    async function fetchToken() {
      const name = localStorage.getItem('name');
      const token = localStorage.getItem('token');

      if (name == null || token == null) {
        setLogin(false);
      }

      const res = await fetch('http://localhost:3000', {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
          name
        }
      });
    };

    fetchToken();
  })

  return (
    <>
      {login && <Main />}
      {!login && <LoginForm />}
    </>
  )
}
