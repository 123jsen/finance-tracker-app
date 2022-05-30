import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [error, setError] = useState();

  const { register, handleSubmit } = useForm();
  
  const accountHandler = async (data, URI, acceptStatus) => {
    try {
      const res = await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // 200 for accept login, 201 for account created
      if (res.status !== acceptStatus) {
        setError(await res.text());
      }
      else {
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
      setError('Error occurred with Server');
      return;
    }
  }

  const handleLogin = async (data) => {
    await accountHandler(data, 'http://localhost:3000/login/login', 200);
  }

  const handleRegister = async (data) => {
    await accountHandler(data, 'http://localhost:3000/login/create', 201);
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
        {error != null && <p className={error ? "error" : ""}>{error}</p>}
      </form>
    </>
  );
}
