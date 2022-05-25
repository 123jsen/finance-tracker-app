import React from 'react';

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
    <div>
      <h1>Finance Tracker App</h1>
      <LogoutButton />
    </div>
  )
};
