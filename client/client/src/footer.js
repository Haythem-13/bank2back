import React from 'react';
import '../src/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <a href="/terms">Terms and Conditions</a>
        <a href="/blog">Blog and News</a>
        <a href="/contact">Contact Us</a>
        
      </div>
      <div className='copyright'>
      © 2023 Your Company. All rights reserved.
      </div>
    
    </footer>
  );
};

export default Footer;
