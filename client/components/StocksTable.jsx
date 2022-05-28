import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../context/LoginContext.jsx';  

function StockRow(props) {
  const { name, token } = useContext(LoginContext);
  const { stock } = props;

  const deleteStock = async () => {
    const res = await fetch('http://localhost:3000/stock/' + stock._id, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        name
      }
    });

    if (res.status == 204) {
      console.log('Success');
    }
    else {
      console.log(await res.text());
    }

    props.reloadStock();
  }

  return (
    <tr key={stock._id}>
      <td>{stock.symbol}</td>
      <td>${stock.buyPrice.toFixed(2)}</td>
      <td>${stock.currentPrice.toFixed(2)}</td>
      <td>${(stock.currentPrice - stock.buyPrice).toFixed(2)}</td>
      <td>{stock.buyDate}</td>
      <td><button onClick={deleteStock}>Delete</button></td>
    </tr>
  )
}

export default function StocksTable(props) {
  const [lastUpdated, setLastUpdated] = useState();

  let tableRows = props.stockData.map((stock) => {
    if (stock == null) {
      console.log('No table data');
      return;
    }
    else
      return <StockRow stock={stock} reloadStock={props.reloadStock}/>
  });;

  useEffect(() => {
    setLastUpdated(new Date());
  }, [props.stockData]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Net Gain/Loss</th>
            <th>Buy Date</th>
            <th>Delete</th>
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
