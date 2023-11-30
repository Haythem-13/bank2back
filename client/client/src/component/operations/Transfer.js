import React, { useState } from 'react';
import './Transfer.css';
import Axios from 'axios';

const Transfer = () => {
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromAccountChange = (e) => {
    setFromAccount(e.target.value);
  };

  const handleToAccountChange = (e) => {
    setToAccount(e.target.value);
  };

  const handleTransfer = async () => {
    console.log('Transfer initiated!');
    console.log('Amount:', amount);
    console.log('From Account:', fromAccount);
    console.log('To Account:', toAccount);

    try {
      const transferData = {
        amount: parseInt(amount),
        fromAccount,
        toAccount,
      };

      const response = await Axios.post('http://localhost:5000/accounts/transfer', transferData);
      console.log(response.data);
      // Reset the form fields
      setAmount('');
      setFromAccount('');
      setToAccount('');
    } catch (error) {
      console.error('Transfer failed:', error.response.data);
    }
  };

  return (
    <div className="bank-transfer-container">
      <h2 className="bank-title">Bank Transfer</h2>
      <div id="form-group">
        <label htmlFor="amount">Amount:</label>
        <input type="text" id="Amount" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="form-group2">
        <label htmlFor="fromAccount">From Account:</label>
        <input type="text" id="fromAccount" value={fromAccount} onChange={handleFromAccountChange} />
      </div>
      <div className="form-group3">
        <label htmlFor="toAccount">To Account:</label>
        <input type="text" id="toAccount" value={toAccount} onChange={handleToAccountChange} />
      </div>
      <button className="transfer-btn" onClick={handleTransfer}>
        Transfer
      </button>
    </div>
  );
};

export default Transfer;
