import React, { useEffect, useState, useContext } from 'react';
import LoginContext from '../../context/LoginContext.jsx';

function StockRow({ stock, reloadStock, setSelectStock }) {
  const { name, token } = useContext(LoginContext);

  const deleteStock = async () => {
    const res = await fetch(`${process.env.API_BASE_URL}/stock/` + stock._id, {
      method: 'DELETE',
      headers: {
        Authorization: token,
        name
      }
    });

    if (res.status == 204)
      console.log('Success');
    else
      console.log(await res.text());


    reloadStock();
  }

  const selectStock = () => {
    setSelectStock(stock);
  }

  return (
    <tr key={stock._id} className="my-2 border-2">
      <td>{stock.symbol}</td>
      <td>${stock.buyPrice.toFixed(2)}</td>
      <td>${stock.currentPrice.toFixed(2)}</td>
      <td>${(stock.currentPrice - stock.buyPrice).toFixed(2)}</td>
      <td><button className="rounded bg-slate-700 mx-3 p-1 hover:bg-slate-200" onClick={selectStock}>Select</button></td>
      <td><button className="rounded bg-slate-700 mx-3 p-1 hover:bg-slate-200" onClick={deleteStock}>Delete</button></td>
    </tr>
  )
}

export default function StocksTable({ stockData, reloadStock, setSelectStock }) {
  const [lastUpdated, setLastUpdated] = useState();

  let tableRows = stockData.map((stock) => {
    if (stock == null) {
      console.log('No table data');
      return;
    }
    else
      return <StockRow stock={stock} reloadStock={reloadStock} setSelectStock={setSelectStock}/>
  });;

  useEffect(() => {
    setLastUpdated(new Date());
  }, [stockData]);

  return (
    <div>
      <table>
        <thead>
          <tr className="border-2">
            <th>Stock</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Net Gain/Loss</th>
            <th>Select</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
      {lastUpdated && <p className="text-sm text-gray-300"> Last Updated at {lastUpdated.toString()} </p>}
    </div>
  )
};
