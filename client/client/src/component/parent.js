import React, { useState, useEffect } from 'react';
import BankHistory from './operations/BankHistory';
import LoginSignupForm from './login';

const ParentComponent = () => {
  const [operations, setOperations] = useState([]);
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    setOperations([
      { date: '2023-05-31', description: 'Deposit', amount: 5000 },
      { date: '2023-05-28', description: 'Withdrawal', amount: '200' },
      { date: '2023-05-27', description: 'Transfer', amount: '100' },
      { date: '2023-05-26', description: 'Loan', amount: '1000' }
    ]);
  }, []);

  const addOperation = () => {
    const newOperation = {
      date: getCurrentDate(),
      description: 'New Operation',
      amount: Math.floor(Math.random() * 1000)
    };

    setOperations([...operations, newOperation]);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <button onClick={addOperation}>Add Operation</button>
      <BankHistory operations={operations} />
      <LoginSignupForm setIsLoginMode={setIsLoginMode} isLoginMode={isLoginMode} />
    </div>
  );
};

export default ParentComponent;
