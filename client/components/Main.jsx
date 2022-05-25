import React from 'react';
import StocksTable from './StocksTable.jsx'

function LogoutButton() {

  const logout = () => {
    localStorage.clear();

    window.location.reload();
  }

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
