import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';
import { Link, Routes, Route } from "react-router-dom";
import Stocks from './stocks/Stocks.jsx';
import Settings from './settings/Settings.jsx';

function LogoutButton() {
  const { name, logout } = useContext(LoginContext);

  return (
    <div className="bg-gray-800 p-3 rounded shadow">
      <p>Currently Logged In: {name}</p>
      <button onClick={logout} className="hover:cursor-pointer bg-zinc-700 px-4 py-1 rounded hover:bg-zinc-100 hover:text-gray-800">Logout</button>
    </div>
  )
}

export default function Main() {
  return (
    <div>
      <div className="bg-zinc-200 flex justify-between p-4 shadow-xl">
        <h1 className="text-gray-800 font-bold text-4xl">Finance Tracker App</h1>
        <LogoutButton />
      </div>

      <nav className="mb-4 bg-zinc-400 p-3 shadow">
        <Link to="/" className="bg-slate-600 px-8 py-2 mr-2 rounded hover:bg-gray-200 hover:text-gray-800">Stocks</Link>
        <Link to="/settings" className="bg-slate-600 px-8 py-2 mr-2 rounded hover:bg-gray-200 hover:text-gray-800">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Stocks />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  )
}