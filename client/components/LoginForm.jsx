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
    await accountHandler(data, `${process.env.API_BASE_URL}/login/login`, 200);
  }

  const handleRegister = async (data) => {
    await accountHandler(data, `${process.env.API_BASE_URL}/login/create`, 201);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-gray-800 px-10 py-6 rounded-xl">
        <h1 className="text-center mb-5 text-3xl font-semibold">Login</h1>
        <label>Username:</label>
        <input {...register("name")} type='text' className="form-input"/>
        <br />
        <label>Password:</label>
        <input {...register("password")} type='password' className="form-input"/>
        <br />
        {error != null && <p className={error ? "text-red-600" : ""}>{error}</p>}
        <div className="flex justify-around pt-4">
          <input type='submit' value='Login' onClick={handleSubmit(handleLogin)} className="button"/>
          <input type='submit' value='Register' onClick={handleSubmit(handleRegister)} className="button"/>
        </div>
      </form>
    </div>
  );
}
