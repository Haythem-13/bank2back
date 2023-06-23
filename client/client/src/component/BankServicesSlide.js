import React from 'react';
import Slider from 'react-slick';
import './BankServicesSlide.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import myImage1 from '../img/service/pexels-photo-210607.jpeg';
import myImage2 from '../img/service/pexels-photo-6266445.webp';
import myImage4 from '../img/service/pexels-photo-2988232.webp';
import myImage3 from '../img/service/pexels-photo-7415039.jpeg';
import myImage5 from '../img/service/pexels-photo-7821711.webp';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='slider'>
      <Slider {...settings}>
        <div className='img-container'>
        <img src={myImage1} alt="Image 1" />
          <div className='ribbon'>
            <h4 className="paragraph">Exchange Rate Service:</h4>
            <p className='descrp'> Real-time currency conversion for hassle-free international transactions. Stay updated and make informed decisions. Efficient and reliable.</p>
          </div>
        </div>
        <div className='img-container'>
          <img src={myImage2} alt='Image 2' />
          <div className='ribbon'>
            <h4 className="paragraph">Savings Account</h4>
            <p id='uniq1'> A savings account is a basic banking service that allows individuals to deposit and save their money while earning interest on the balance. It provides a safe and secure way to accumulate funds for future goals or emergencies.</p>
          </div>
        </div>
        <div className='img-container'>
          <img src={myImage3} alt='Image 3' />
          <div className='ribbon'>
            <h4 className="paragraph">Mortgage Loans</h4>
           <p className='descrp'>Mortgage loans are long-term loans provided by banks to finance the purchase of a property. They enable individuals to become homeowners by borrowing a substantial amount of money, which is repaid over an extended period, typically with interest.</p>           </div>
        </div>
        <div className='img-container'>
          <img src={myImage4} alt='Image 4' />
          <div className='ribbon'>
            <h4 className="paragraph">Credit Cards</h4>
            <p id='uniq'> Credit cards are a widely-used financial tool that allows individuals to make purchases on credit. They offer a convenient and secure way to pay for goods and services, with the flexibility to repay the borrowed amount over time. Credit cards often come with rewards programs and other benefits.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className='img-container'>
          <img src={myImage5} alt='Image 5' />
          <div className='ribbon'>
            <h4 className="paragraph">24/7 Advice Service</h4>
            <p className='descrp'>Expert guidance and support at your fingertips. Get instant assistance whenever you need it, day or night. Reliable advice tailored to your financial needs.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
