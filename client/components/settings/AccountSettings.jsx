import React, { useContext } from 'react';
import LoginContext from '../../context/LoginContext.jsx';

export default function AccountSettings() {

  const { name, token } = useContext(LoginContext);

  const deleteRequest = async (URI) => {
    const res = await fetch(URI, {
      method: 'DELETE',
      headers: { Authorization: token, name }
    });

    if (res.status != 204) {
      return;
    }

    localStorage.clear();
    window.location.reload();
  }

  const clearLogins = () => {
    console.log('Clear Logins');
    deleteRequest(`${process.env.API_BASE_URL}/user/tokens`);
  }

  const deleteAccount = () => {
    const confirmDelete = confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    deleteRequest(`${process.env.API_BASE_URL}/user/account`);
  }

  return (
    <div className="mt-4">
      <h3> Account Settings</h3>
      <button onClick={clearLogins} className="button">Clear Logins</button>
      <br></br>
      <button onClick={deleteAccount} className="button">Delete Account</button>
    </div>
  )

}