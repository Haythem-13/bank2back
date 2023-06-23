import React from 'react';
import './Card.css';

const Card = ({ date, description, amount }) => {
  return (
    <div className="bank-history-card">
      <table>
        <thead>
          <tr>
            <th>date:{date}</th>
            <th>description:{description}</th>
            <th>amount:{amount}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{date}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
          <tr>
            <td>{date}</td>
            <td>{description}</td>
            <td>{amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Card;
