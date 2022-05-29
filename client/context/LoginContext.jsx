// https://dev.to/dancurtis/learn-to-usecontext-with-hooks-in-3-minutes-4c4g

import React, { useState } from 'react';

const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  const [name, setName] = useState();
  const [token, setToken] = useState();

  async function checkLogin() {
    console.log('Check Login');

    if (name == null) {
      console.log(`Name is: ${name}`);
      return false;
    }

    if (token == null) {
      console.log(`Token is: ${token}`);
      return false;
    }

    // Fake endpoint that will activate middleware
    const res = await fetch('http://localhost:3000/auth', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        name
      }
    });

    if (res.status == 400) {
      console.log(await res.text());
      localStorage.clear();
      return false;
    }

    return true;
  };

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  useState(() => {
    setName(localStorage.getItem('name'));
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <LoginContext.Provider value={{ checkLogin, logout, name, token }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;