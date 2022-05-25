import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';
import StocksTable from './StocksTable.jsx';
import StocksAddform from './StocksAddform.jsx';

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
      <StocksTable />
      <StocksAddform />
    </>
  )
};
