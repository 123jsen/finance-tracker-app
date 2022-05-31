import React, { useEffect, useState } from 'react';

export default function StocksBoard({ stockData }) {
  let [totalValue, setTotalValue] = useState(0);
  let [currentGain, setCurrentGain] = useState(0);
  let [totalGain, setTotalGain] = useState(0);

  useEffect(()=>{
    setTotalValue(0);
    setCurrentGain(0);
    setTotalGain(0);

    stockData.forEach((stock) => {
      setTotalValue((currTotal) => (currTotal + stock.currentPrice));
      setCurrentGain((currGain) => (currGain + stock.currentPrice - stock.buyPrice));
      setTotalGain((currGain) => (currGain + stock.currentPrice - stock.buyPrice));
    })
  }, [stockData])

  return (
    <div className="mx-32 my-8 border-2 p-4 bg-slate-900">
      <h2>Stock Current Total Value:</h2>
      <p className="ml-10">${totalValue.toFixed(2)}</p>
      <h2>Stock Current Gain:</h2>
      <p className={currentGain >= 0 ? "ml-10 text-green-500" : "ml-10 text-red-500"}>${currentGain.toFixed(2)}</p>
      <h2>Total Gain:</h2>
      <p className={totalGain >= 0 ? "ml-10 text-green-500" : "ml-10 text-red-500"}>${totalGain.toFixed(2)}</p>
    </div>
  )
}