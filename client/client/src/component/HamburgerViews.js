import React from "react";
import './hamburgerView.css'

const HamburgerViews = ({ isOpen, onClose }) => {
  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
 
      <ul>
        <li>
          <a href="/">Menu Item 1</a>
        </li>
        <li>
          <a href="/">Menu Item 2</a>
        </li>
        <li>
          <a href="/">Menu Item 3</a>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerViews;
