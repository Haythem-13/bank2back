import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Operations from "./component/operations/Operations";
import Cart from "./component/operations/Cart";
import Navbar from "./component/navbar";
import ImageSlider from "./component/BankServicesSlide";
import Footer from "./footer";
import ExchangeRateConverter from "./component/operations/ExchangeRate";
import Profiling from "./component/operations/Profiling";
import LoginSignupForm from "./component/login";
import LandingPage from "./component/Landing";
import BankHistory from "./component/operations/BankHistory";
import Contact from "./component/Contact";
import Advice from "./component/operations/Advice";
import Loan from "./component/operations/Loan";
import Transfer from "./component/operations/Transfer";
import Signup from "./component/signup";
import AccountsItem from "./AccountsItem";

const App = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleToggleLoginMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Router>
      <div className="App">
        <Navbar className="nav"  />
        <div className="content">
          <Routes>
            <Route className="header" path="/" element={<LandingPage />} />
            

            <Route
              path="/login"
              element={
                <LoginSignupForm
                  isLoggedIn={isLoginMode}
                  onToggleLoginMode={handleToggleLoginMode}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Signup
                  isLoggedIn={isLoginMode}
                  onToggleLoginMode={handleToggleLoginMode}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginSignupForm
                  isLoggedIn={isLoginMode}
                  onToggleLoginMode={handleToggleLoginMode}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LoginSignupForm
                  isLoggedIn={isLoginMode}
                  onToggleLoginMode={handleToggleLoginMode}
                />
              }
            />
            <Route className="slider" path="/about" element={<ImageSlider />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="advice" element={<Advice/>} />
            <Route path="Loan" element={<Loan/>} />
            <Route path="Transfer" element={<Transfer/>} />
            <Route path="/history" element={<BankHistory/>} />
            <Route
              path="/exchange"
              element={
                <React.Fragment>
                  <ExchangeRateConverter />
                  <Profiling />
                </React.Fragment>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
