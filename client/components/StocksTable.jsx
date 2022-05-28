import React, { useEffect, useState } from 'react';

export default function StocksTable(props) {
  const [lastUpdated, setLastUpdated] = useState();

  let tableRows = props.stockData.map((stock) => {
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

  useEffect(() => {
    setLastUpdated(new Date());
  }, [props.stockData]);

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
