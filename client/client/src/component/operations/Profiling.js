import React, { useState } from 'react';
import './profiling.css';

const Profiling = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [needsPercentage, setNeedsPercentage] = useState(0);
  const [leisurePercentage, setLeisurePercentage] = useState(0);
  const [financialGoalsPercentage, setFinancialGoalsPercentage] = useState(0);

  const handleMonthlyIncomeChange = (e) => {
    setMonthlyIncome(e.target.value);
    calculateSalaryDistribution(e.target.value, selectedProfile);
  };

  const handleProfileChange = (e) => {
    setSelectedProfile(e.target.value);
    calculateSalaryDistribution(monthlyIncome, e.target.value);
  };

  const calculateSalaryDistribution = (income, profile) => {
    let needs = 0;
    let leisure = 0;
    let financialGoals = 0;

    if (profile === 'perfectConsumer') {
      needs = income * 0.5;
      leisure = income * 0.3;
      financialGoals = income * 0.2;
    } else if (profile === 'consumer') {
      needs = income * 0.5;
      leisure = income * 0.15;
      financialGoals = income * 0.05;
    } else if (profile === 'epicure') {
      needs = income * 0.45;
      leisure = income * 0.4;
      financialGoals = income * 0.05;
    } else if (profile === 'economic') {
      needs = income * 0.5;
      leisure = income * 0.2;
      financialGoals = income * 0.3;
    }

    setNeedsPercentage(needs);
    setLeisurePercentage(leisure);
    setFinancialGoalsPercentage(financialGoals);
  };

  return (
    <div className='full-container'>
      {/* <div className="ope-desc">
        <h3 className='titl'>Welcome to the Profiling Section</h3>
        <p>
          This section allows you to analyze and optimize your income allocation based on your chosen profile.
          Enter your monthly income and select a profile type to see the recommended distribution percentages for needs, leisure, and financial goals.
          Make informed decisions and gain insights into effectively managing your finances.
        </p>
      </div> */}
      <div className="profiling-container">
        <h2 className="profili">Profile Section</h2>
        <label htmlFor="monthlyIncome">Monthly Income:</label>
        <input
          className="profile-input"
          type="number"
          id="monthlyIncome"
          value={monthlyIncome}
          onChange={handleMonthlyIncomeChange}
        />

        <label htmlFor="profile">Profile:</label>
        <select id="profile" value={selectedProfile} onChange={handleProfileChange}>
          <option value="">Select Profile</option>
          <option value="perfectConsumer">Perfect Consumer</option>
          <option value="consumer">The Consumer</option>
          <option value="epicure">The Epicure</option>
          <option value="economic">The Economic</option>
        </select>

        {selectedProfile && (
          <div className="distrib">
            <h6 id='dist'>Salary Distribution Priorities:</h6>
            <p id="percen">
              Needs: <span>{needsPercentage.toFixed(2)}</span>
            </p>
            <p id="percen1">
              Leisure: <span>{leisurePercentage.toFixed(2)}</span>
            </p>
            <p id="percen2">
              Financial Goals: <span>{financialGoalsPercentage.toFixed(2)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profiling;
