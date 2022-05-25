import React, { useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';
import StocksTable from './StocksTable.jsx';

function LogoutButton() {
  const { logout } = useContext(LoginContext);

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default function Main() {
  return (
    <>
      <h1>Finance Tracker App</h1>
      <LogoutButton />
      <StocksTable />
    </>
  )
};
