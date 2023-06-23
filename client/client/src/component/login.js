import React, { useState } from 'react';
import { Link ,useNavigate}from 'react-router-dom';
import"./login.css"
import axios from 'axios';

const Alert = ({ message, type }) => {
  return <div className={`alert ${type}`}>{message}</div>;
};

const Login = ({ setIsLoginMode }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    let token=sessionStorage.getItem("token")
    try {
    e.preventDefault();
    const loginAccount = {username: userName,password: password};
      const response = await axios.post("http://localhost:5000/Accounts/login", loginAccount,
      {headers:{"Authorization":`Bearer${token}`}
    });
      console.log(response);
      setAlertMessage(response.data.msg);
      setAlertType('success');
      if (response) {
        sessionStorage.setItem("token", JSON.stringify(response.data));
        setUserName(response.data.username); // Set the userName state using the setUserName prop
        navigate("/");
        window.location.reload();
      }
    }
      catch (error) {
        setAlertMessage(error.response.data.msg);
        setAlertType('error');
    }

    setUserName('');
    setPassword('');
  };

  return (
    <div className="form-container login-mode">
       {alertMessage && <Alert message={alertMessage} type={alertType} />}
      <h2 id='log-title'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>USER-NAME:</label>
          <input
            type="text"
            id="UserName-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>PASSWORD:</label>
          <input
            id="pass-input"
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
          <button id="log-btn" type="submit">Login</button>
        </div>
      </form>
      <div className="toggle-mode">
        <p className="log-msg">
          Don't have an account?{' '}
          <Link id='go-sign' to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
