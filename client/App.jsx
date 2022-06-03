import React, { useState, useEffect, useContext } from 'react';
import LoginForm from './components/LoginForm.jsx';
import LoginContext from './context/LoginContext.jsx';
import Main from './components/Main.jsx';
import './App.css';

const Loading = () => {
  const { logout } = useContext(LoginContext);

  const handleClick = () => {
    logout();
  }
  return (
    <div className="p-2">
      <p>Loading</p>
      <a href="#" onClick={handleClick} className="underline text-blue-400">Not working?</a>
    </div>
  )
}

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

  const NoLogin = () => (
    <>
      {login === null ? <Loading /> : <LoginForm />}
    </>
  )


  return (
    <div className="h-screen bg-slate-500 text-white text-lg overflow-auto">
      {login ? <Main /> : <NoLogin />}
    </div>
  )
}

