import React, { useState, useEffect, useContext } from 'react';
import LoginForm from './components/Login.jsx';
import LoginContext from './context/LoginContext.jsx';
import Main from './components/Main.jsx';

export default function App() {
  const [login, setLogin] = useState(false);
  const { checkLogin } = useContext(LoginContext);

  useEffect(() => {
    const verify = async () => {
      setLogin(await checkLogin())
    }

    verify();
  })

  return login ? <Main /> : <LoginForm />;
}
