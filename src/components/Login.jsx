import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [success, setSuccess] = useState(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.status !== 200) {
      setSuccess(false);
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

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label for='name'>Username:</label>
        <input {...register("name")} id='name' type='text' name='name' />
        <br />
        <label for='pass'>Password:</label>
        <input {...register("password")} id='pass' type='password' name='password' />
        <br />
        <input type='submit' value='Login' />
        {!success && <p style={{ color: "red" }}>Invalid Login</p>}
      </form>
    </>
  );
}
