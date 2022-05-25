import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [success, setSuccess] = useState(true);
  const [error, setError] = useState('Invalid Login');

  const { register, handleSubmit } = useForm();
  const handleLogin = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.status !== 200) {
        setSuccess(false);
        setError('Invalid Login');
      }
      else {
        setSuccess(true);

        const { name, token } = await res.json();

        // Register Tokens in local storage
        localStorage.clear();
        localStorage.setItem('name', name);
        localStorage.setItem('token', token);

        // Reload Page
        window.location.reload();
      }
    } catch (err) {
      console.log(err.message);
      setSuccess(false);
      setError('Error occurred with Server');
      return;
    }
  }

  const handleRegister = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (res.status !== 201) {
        setSuccess(false);
        setError(await res.text());
      }
      else {
        setSuccess(true);

        const { name, token } = await res.json();

        // Register Tokens in local storage
        localStorage.clear();
        localStorage.setItem('name', name);
        localStorage.setItem('token', token);

        // Reload Page
        window.location.reload();
      }
    }
    catch (err) {
      console.log(err.message);
      setSuccess(false);
      setError('Error occurred with Server');
      return;
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>Username:</label>
        <input {...register("name")} type='text' />
        <br />
        <label>Password:</label>
        <input {...register("password")} type='password' />
        <br />
        <input type='submit' value='Login' onClick={handleSubmit(handleLogin)} />
        <input type='submit' value='Register' onClick={handleSubmit(handleRegister)} />
        {!success && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </>
  );
}
