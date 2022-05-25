import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';

export default function StocksTable() {

  const { name, token } = useContext(LoginContext);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // async function for fetching token
    async function fetchStockData() {

      const res = await fetch('http://localhost:3000/stock', {
        headers: {
          Authorization: token,
          name
        }
      });

      setStockData(await res.json());
    };

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
          <td>${stock.buyPrice}</td>
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
            <th>Buy Date</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )
};
