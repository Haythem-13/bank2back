import {  useState } from "react";
import "./AccountItem.css"
import axios from "axios";


const AccountsItem =  () => {
  const [Accounts, setAccounts] = useState([]);

const getAllAccounts = async () => {
  try {
    let response = await axios.get("http://localhost:5000/accounts");
    setAccounts(response.data); 
  } catch (error) {
    console.error(error);
  }
 };
  return (
    <div className="MYPROFILE">
      <button className="submit-button" onClick={getAllAccounts}>Get ALL Accounts </button>
      {/* <button className="delete-button" >x </button> */}
      <button className="delete-button" >Hide ALL Accounts </button>
      {Accounts.map((Account) => (
        <div className="accountList" key={Account.id}>
          <h2 id="U-name"><span className="title">Username</span>:{Account.username}</h2>
          <h3 id="U-mail"><span className="title">Email:</span>{Account.email}</h3>
          <h3 id="U-salary"><span className="title">Salary:</span>{Account.salary}</h3>
          <h4 id="U-pass"><span className="title">Password:</span>{Account.password}</h4>
          <h6 id="U-id"><span className="title">ID:</span>{Account._id}</h6>
          <hr/>
        </div>
      ))}
    </div>
  );
};


export default AccountsItem