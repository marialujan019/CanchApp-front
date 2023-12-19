import React from 'react';
import './banner.css';

const Banner = ({ pageName }) => {
  return (
    <div className="bannerContainer">
      <h1 className='bannerTitulo'>{pageName}</h1>
    </div>
  );
};

export default Banner;
