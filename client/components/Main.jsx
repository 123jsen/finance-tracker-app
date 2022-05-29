import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';
import { Link, Routes, Route } from "react-router-dom";
import Stocks from './stocks/Stocks.jsx';
import Settings from './settings/Settings.jsx';

function LogoutButton() {
  const { name, logout } = useContext(LoginContext);

  return (
    <>
      <p>Currently Logged In: {name}</p>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default function Main() {
  return (
    <>
      <h1>Finance Tracker App</h1>
      <LogoutButton />
      <nav>
        <Link to="/">Stocks</Link> |{" "}
        <Link to="/settings">Settings</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Stocks />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  )
}