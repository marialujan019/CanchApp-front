import React, {  useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from './Card';
import NavigationArrows from './NavigationArrows';
import './carousel.css'

const Carousel = ({cardsData}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const handleNext = () => {
    if (currentIndex + cardsPerPage < cardsData.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleCards = cardsData.slice(currentIndex, currentIndex + cardsPerPage);
  console.log(visibleCards)
  console.log(cardsData)
  return (
    <div className="carousel-container">
      <div className="carousel">
        {visibleCards.map(card => (
          <Card card={card} />
        ))}
      </div>
      
      <div>{ 
      cardsData.length === 0 ? 
      <div><h2>
        No tenes canchas registradas!
      </h2></div> : cardsData.length > 3 ?
      <NavigationArrows onPrev={handlePrev} onNext={handleNext} /> :
      <div> </div>
      }
      </div>
     
    </div>
  );
};

export default Carousel;
