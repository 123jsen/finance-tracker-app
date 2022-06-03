import React from 'react';

export default function StocksOptions({ selectStock }) {
  return (
    <div className="border-2 p-5 relative w-80">
      <div>
        <h3>Selected Stock: {selectStock}</h3>
        <p>Price:</p>
        <p>Purchase Date:</p>
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