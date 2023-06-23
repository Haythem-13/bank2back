import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

const Alert = ({ message, type }) => {
  return <div className={`alert ${type}`}>{message}</div>;
};

const Signup = ({ setIsLoginMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');
  const [userName, setUserName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createNewAccount = {
      username: userName,
      password: password,
      email: email,
      salary: salary,
    };

    try {
      const response = await axios.post("http://localhost:5000/accounts/create", createNewAccount);
      console.log(response);
      setAlertMessage(response.data.msg);
      setAlertType('success');
      navigate("/");
    } catch (error) {
      setAlertMessage(error.response.data.msg);
      setAlertType('error');
    }

    setEmail('');
    setPassword('');
    setSalary('');
    setUserName('');
  };

  return (
    <div className="form-container">
      {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            id="username-Nput"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            id="pass-Nput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            pattern="^(?=.*\d).{8,}$"
            title="Password must be at least 8 characters long and contain at least one number"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            id="mail-Nput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            id="salary-Nput"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button id="sign-btn" type="submit">Sign Up</button>
        </div>
      </form>
      <div className="toggle-mode">
        <p className="log-msg">
          Already have an account?{' '}
          <Link id='go-log' to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

