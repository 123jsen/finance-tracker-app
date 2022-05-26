import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';

export default function StocksTable() {

  const { name, token } = useContext(LoginContext);
  const [stockData, setStockData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState();

  const fetchAllStockPrice = async (data) => {
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

    if (newData.length > 0)
      setLastUpdated(new Date());
  }

  // async function for fetching stock data
  async function fetchStockData() {

    const res = await fetch('http://localhost:3000/stock', {
      headers: {
        Authorization: token,
        name
      }
    });

    const data = await res.json();
    fetchAllStockPrice(data);

    // Set regular update to stock prices

    setInterval(() => fetchAllStockPrice(data), 5000);

  };


  useEffect(() => {
    // call async function
    fetchStockData();
  }, [])

  let tableRows = stockData.map((stock) => {
    if (stock == null) {
      console.log('No table data');
      return;
    }
    else
      return (
        <tr key={stock._id}>
          <td>{stock.symbol}</td>
          <td>${stock.buyPrice.toFixed(2)}</td>
          <td>${stock.currentPrice.toFixed(2)}</td>
          <td>${(stock.currentPrice - stock.buyPrice).toFixed(2)}</td>
          <td>{stock.buyDate}</td>
        </tr>
      )
  });;

  return (
    <>
      <h2>Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Net Gain/Loss</th>
            <th>Buy Date</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      {lastUpdated && <p> Last Updated at {lastUpdated.toString()} </p>}
    </>
  )
};
