import React, { useState, useEffect } from 'react';
import './BankHistory.css';

const BankHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchBankHistory();
  }, []);

  const fetchBankHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/bankhistory'); // Update the fetch URL
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching bank history:', error);
    }
  };

  return (
    <div className="bank-history-container">
      <h2>Bank Operations History</h2>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Name of Operation</th>
            <th>Amount</th>
            <th>Participant</th>
          </tr>
        </thead>
        <tbody>
          {history.map((operation) => (
            <tr key={operation._id}>
              <td>{operation.date}</td>
              <td>{operation.description}</td>
              <td>{operation.amount}</td>
              <td>{operation.username}</td> {/* Update to the appropriate field name for participant */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total Amount:</td>
            <td>result</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default BankHistory;
