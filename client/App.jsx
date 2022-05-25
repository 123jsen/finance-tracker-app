import React, { useState, useEffect } from 'react';
import LoginForm from './components/Login.jsx';
import Main from './components/Main.jsx';

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

      if (res.status == 400) {
        console.log(await res.text());
        setLogin(false);
      }
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
