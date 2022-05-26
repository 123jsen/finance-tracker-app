import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import LoginContext from '../context/LoginContext.jsx';

export default function StocksAddform() {

  const { name, token } = useContext(LoginContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {

    const res = await fetch('http://localhost:3000/stock/' + data.symbol, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        name
      },
      body: JSON.stringify({
        buyPrice: data.price,
        buyDate: new Date()
      })
    });

    if (res.status != 200) {
      console.log(res.text());
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Ticker Symbol:</label>
      <input {...register("symbol")} type='text' />
      <br />
      <label>Price:</label>
      <input {...register("price")} type='text' />
      <br />
      <input type="submit" value="Add Stock"></input>
    </form>
  )
};
