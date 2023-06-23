import React, { useState } from 'react';
import axios from 'axios';
import './loan.css';

const Loan = () => {
  const [duration, setDuration] = useState(1);
  const [amount, setAmount] = useState({
    principal: '',
    totalAmount: 0
  });

  const { principal, totalAmount } = amount;

  const calculateTotalAmount = () => {
    const interestRate = getInterestRate();
    const time = parseInt(principal);

    const total = parseFloat(time) + parseFloat(time) * interestRate * duration;
    setAmount({ ...amount, totalAmount: total.toFixed(2) });
  };

  const getInterestRate = () => {
    let interestRate = 0.05;
    if (duration > 10) {
      interestRate += 0.002; // Add 0.02 for every year beyond 10 years
    } else {
      interestRate += duration * 0.001; // Multiply the duration by 0.01
    }
    return interestRate;
  };

  const handlePrincipalChange = (e) => {
    setAmount({ ...amount, principal: e.target.value });
  };

  const handleDurationChange = (e) => {
    let newDuration = parseInt(e.target.value);
    if (newDuration < 1) {
      newDuration = 1;
    } else if (newDuration > 30) {
      newDuration = 30;
    }
    setDuration(newDuration);
  };

  const handleExecuteLoan = () => {
    if (totalAmount > 0) {
      const confirmLoan = window.confirm('Would you like to get that loan now?');
      if (confirmLoan) {
        // Perform the loan request
        axios
          .post('http://localhost:5000/accounts/loan', {
            principal,
            duration
          })
          .then((response) => {
            alert('Loan application submitted!');
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Failed to submit loan application:', error);
          });
      }
    }
  };

  return (
    <div className="loan-container">
      <h2 id="loa">Loan Simulation</h2>
      <div>
        <label htmlFor="principal">Principal Amount:</label>
        <input
          type="number"
          id="principal"
          value={principal}
          onChange={handlePrincipalChange}
        />
      </div>
      <div>
        <label htmlFor="duration">Loan Duration (in years):</label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={handleDurationChange}
          min="1"
          max="30"
        />
      </div>
      <button id="loan-btn" onClick={calculateTotalAmount}>
        Calculate Total Amount
      </button>
      {totalAmount > 0 && (
        <div className="moveit">
          <p id="amount">Total Amount: {totalAmount}</p>
        </div>
      )}
      {totalAmount > 0 && (
        <div>
          <button id="execute-btn" onClick={handleExecuteLoan}>
            Execute
          </button>
        </div>
      )}
    </div>
  );
};

export default Loan;
