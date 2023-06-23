import React from 'react';
import './Landing.css'; 
import myImage1 from '../img/logo.png';


const LandingPage = () => {
  return (
    <div className="Intro">
      <div class="loader">
  <div class="inner one"></div>
  <div class="inner two"></div>
  <div class="inner three"></div>
</div>
      <h1>Bank to Back</h1>
      <h4 className='slogan'>ClientEase Bank:Care& simplicity</h4>
      <p>
        "Bank to Back: Where Clients Come First" - At Bank to Back, our primary focus is on our clients. We go above and beyond to understand their financial needs and provide exceptional service that surpasses expectations. We prioritize building long-lasting relationships based on trust and car
      </p>
    </div>
  );
};

export default LandingPage;
