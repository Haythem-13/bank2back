import React, { useState, useEffect } from 'react';
import "./exchangerate.css"

const ExchangeRateConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [conversionRate, setConversionRate] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const API_ENDPOINT = 'https://api.frankfurter.app';
  const YOUR_API_KEY = "YOUR_API_KEY";

  // Fetch the list of currency options from the API
  useEffect(() => {
    const fetchCurrencyOptions = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/latest`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
          }
        });
        const data = await response.json();
        setCurrencyOptions(Object.keys(data.rates));
      } catch (error) {
        console.error('Error fetching currency options:', error);
      }
    };

    fetchCurrencyOptions();
  }, []);

  // Fetch the conversion rate from the Currency API
  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT}/latest?from=${fromCurrency}&to=${toCurrency}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${YOUR_API_KEY}`
            }
          }
        );
        const data = await response.json();
        setConversionRate(data.rates[toCurrency]);
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchConversionRate();
    }
  }, [fromCurrency, toCurrency]);

  // Handle the input changes and calculate the converted amount
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setAmount(inputValue);
    setConvertedAmount(inputValue * conversionRate);
  };

  // Handle the conversion
  const handleConvert = () => {
    const converted = amount * conversionRate;
    setConvertedAmount(converted);
  };

  return (
    <div className='exchange-container'>
      <h2 className='loa'>Exchange Rate Converter</h2>
      <div>
        <input
          id='exchange-input'
          type="number"
          value={amount}
          onChange={handleInputChange}
          placeholder="Enter amount"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="">Select currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="">Select currency</option>
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <button className='convert' onClick={handleConvert}>Convert</button>
      </div>
      {conversionRate > 0 && (
        <div className='converted-contain'>
          <p className='p-top'>Converted Amount:</p>
          <p className='p-bottom'>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        </div>
      )}
    </div>
  );
};

export default ExchangeRateConverter;
