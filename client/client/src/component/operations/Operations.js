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
          <div className="contain-1">  <Profiling /></div>
          <div className="desc-1"> The "Profiling" feature in this web application offers users valuable insights and personalized financial recommendations based on their individual income and chosen profile type. By inputting their monthly earnings and selecting a profile that best represents their financial behavior, users can receive optimized salary distribution percentages for essential needs, leisure activities, and long-term financial goals. This powerful tool empowers users to make informed decisions, effectively manage their finances, and work towards achieving their financial aspirations. With tailored guidance and strategic allocation, the Profiling feature serves as a virtual financial advisor, helping users enhance their financial management and pave the way to a more secure and prosperous financial future.</div>
          <div className="rib">MANAGER</div>
        </div>
        <div className={`advice${showAdvice ? " active" : ""}`}>
        <div className="contain-1">  <Advice /></div>
          <div className="desc-1"> The Advice component is a simple React application that allows users to ask a question and receive an answer, presumably generated using an AI-based service</div>
          <div className="rib">ADVICE</div>
        </div>
        <div className={`loan${showLoan ? " active" : ""}`}>
        <div className="contain-1">   <Loan /></div>
          <div className="desc-1"> The  loan simulation application. It allows users to input the principal amount they want to loan, the duration for which they want the loan (in years), and then calculates the total amount to be repaid based on a predefined interest rate formula.</div>
          <div className="rib">LOAN</div>
        </div>
        <div className={`center-left${showTransfer ? " active" : ""}`}>
          <Transfer />
          <div className="desc-1"> The  loan simulation application. It allows users to input the principal amount they want to loan, the duration for which they want the loan (in years), and then calculates the total amount to be repaid based on a predefined interest rate formula.</div>
          {/* <div className="rib">Transfer</div> */}
        </div>
        <div className={`center-right${showExchangeRate ? " active" : ""}`}>
          <ExchangeRateConverter />
          <div className="desc-1"> The  loan simulation application. It allows users to input the principal amount they want to loan, the duration for which they want the loan (in years), and then calculates the total amount to be repaid based on a predefined interest rate formula.</div>
          {/* <div className="rib">Exchange RateConverter</div> */}
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
