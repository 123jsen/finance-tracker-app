import React from 'react';

export default function StocksOptions({ selectStock }) {
  return (
    <div className="border-2 p-5 relative w-80">
      <div>
        <h3>Selected Stock: {selectStock.symbol}</h3>
        <p>Buy Price: {selectStock.buyPrice.toFixed(2)}</p>
        <p>Purchase Date: {selectStock.buyDate}</p>
      </div>
      <div className="absolute bottom-0">
        <label>Selling Price:</label>
        <br/>
        <input type="text"/>
        <br/>
        <label>Sell Date:</label>
        <br/>
        <input type="text"/>
        <br/>
        <button className="button">Sell</button>
      </div>


    </div>
  )
}