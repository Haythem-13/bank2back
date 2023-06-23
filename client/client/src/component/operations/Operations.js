import React, { useState } from "react";
import ExchangeRateConverter from "./ExchangeRate";
import Loan from "./Loan";
import Advice from "./Advice";
import { NavLink } from 'react-router-dom';
import BankHistory from "./BankHistory";
import Transfer from "./Transfer";
import "./operations.css";
import Profiling from "./Profiling";

const Operations = ({ isLoggedIn, onToggleLoginMode }) => {
  const [showManager, setShowManager] = useState(true);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showLoan, setShowLoan] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showExchangeRate, setShowExchangeRate] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = (target) => {
    setShowManager(target === "manager");
    setShowAdvice(target === "advice");
    setShowLoan(target === "loan");
    setShowTransfer(target === "transfer");
    setShowExchangeRate(target === "exchange");
    setShowHistory(target === "history");
  };
let token=sessionStorage.getItem("token");
console.log(token);
  const handleToggleHistory = () => {
    if (isLoggedIn) {
      setShowHistory(!showHistory);
    } else {
      onToggleLoginMode();
    }
  };

  return (
    <div className="container">
              {/* {token &&(<React.Fragment>
          <div className={`advice${showAdvice ? " active" : ""}`}>
          <Advice />
        </div>
        <div className={`center-left${showTransfer ? " active" : ""}`}>
          <Transfer />
        </div>
        </React.Fragment>)} */}
      <div className="grid-container">
        <div className={`manager${showManager ? " active" : ""}`}>
          <Profiling />
        </div>
        <div className={`advice${showAdvice ? " active" : ""}`}>
          <Advice />
        </div>
        <div className={`loan${showLoan ? " active" : ""}`}>
          <Loan />
        </div>
        <div className={`center-left${showTransfer ? " active" : ""}`}>
          <Transfer />
        </div>
        <div className={`center-right${showExchangeRate ? " active" : ""}`}>
          <ExchangeRateConverter />
        </div>
        {showHistory && (
          <div className="history">
            <BankHistory />
          </div>
        )}
      </div>
      <div className="button-container">
    
        <button className="operation-button" onClick={() => handleClick("manager")}>
          Account Manager
        </button>
        
        <button className="operation-button" onClick={() => handleClick("loan")}>
          Loan
        </button>
        <button className="operation-button" onClick={() => handleClick("exchange")}>
          Exchange Converter
        </button>
        {token &&(<React.Fragment>
        <button className="operation-button" onClick={() => handleClick("advice")}>
          Advice
        </button>
        <button className="operation-button" onClick={() => handleClick("transfer")}>
          Transfer
        </button>
        <NavLink to="/history" className="toggle-history-link">
            <button className="operation-button" onClick={handleToggleHistory}>
              Account History
            </button>
          </NavLink>
        </React.Fragment>)}
        {!token && (
        <div className="vistor">
        <label htmlFor="MailVistor">Get Offers in Your Email</label>
          <input type="email" id="vist" />
           <button className="offer-button" 
             onClick={() => handleClick("exchange")}>Email Me
          </button>
       </div>
          )}
      </div>
    </div>
  );
};

export default Operations;
