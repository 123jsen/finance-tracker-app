import React, { useState, useEffect, useContext } from 'react';
import LoginForm from './components/Login.jsx';
import LoginContext from './context/LoginContext.jsx';
import Main from './components/Main.jsx';
import './App.css';

export default function App() {
  const [login, setLogin] = useState(null);
  const { checkLogin } = useContext(LoginContext);

  useEffect(() => {
    console.log('Rendering App');

    const verify = async () => {
      setLogin(await checkLogin());
    }
    verify();
  }, [])

  const NoLogin = () => {
    return (
      <>
        {login === null ? <p>Loading</p> : <LoginForm />}
      </>
    )
  }


  return (
    <>
      {login ? <Main /> : <NoLogin />}
    </>
  )
}
