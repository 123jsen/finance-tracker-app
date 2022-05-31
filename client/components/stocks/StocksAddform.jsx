import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginContext from '../../context/LoginContext.jsx';

export default function StocksAddform({reloadStock}) {

  const { name, token } = useContext(LoginContext);
  const { register, handleSubmit } = useForm();

  const [message, setMessage] = useState();
  const [error, setError] = useState(false);

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

    if (res.status == 404) {
      setMessage(await res.text());
      setError(true);
      return;
    }

    setMessage('Stock is added');
    setError(false);

    // Stock is okay, reload form
    reloadStock();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Ticker Symbol:</label>
        <input {...register("symbol")} type='text' className="form-input"/>
        <br />
        <label>Price:</label>
        <input {...register("price")} type='text' className="form-input"/>
        <br />
        <input type="submit" value="Add Stock" className="button"></input>
      </form>
      {message != null && <p className={error ? "text-red-600" : ""}>{message}</p>}
    </>
  )
};
