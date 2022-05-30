import React, { useEffect, useContext, useState } from 'react';
import LoginContext from '../../context/LoginContext.jsx';
import StocksTable from './StocksTable.jsx';
import StocksAddform from './StocksAddform.jsx';

export default function Stocks() {

  const { name, token } = useContext(LoginContext);
  const [stockData, setStockData] = useState([]);

  // fetch stock information from database
  async function loadStock() {
    const res = await fetch('http://localhost:3000/stock', {
      headers: { Authorization: token, name }
    });

    const data = await res.json();
    fetchStockPrices(data);

    // Set regular update to stock prices
    clearInterval(window.interval);
    window.interval = setInterval(() => fetchStockPrices(data), 5000);
  };

  // update stock prices
  async function fetchStockPrices (data) {
    console.log("Updating Prices")

    const requests = [];
    data.forEach((stock) => {
      requests.push(
        fetch('http://localhost:3000/stock/' + stock.symbol, {
          headers: {
            Authorization: token,
            name
          }
        })
          .then((res) => res.json())
      )
    });

    const responses = await Promise.all(requests);

    for (let i = 0; i < data.length; i++) {
      data[i].currentPrice = responses[i].regularMarketPrice;
    }

    // change the ref to re-render
    const newData = data.slice();

    setStockData(newData);
  }

  useEffect(() => {
    // call async function
    loadStock();
  }, [])

  return (
    <>
      <h2>Stocks</h2>
      <StocksTable stockData={stockData} reloadStock={loadStock}/>
      <StocksAddform stockData={stockData} reloadStock={loadStock}/>
    </>
  )
};