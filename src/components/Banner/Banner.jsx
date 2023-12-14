import React from 'react';
import './banner.css';

const Banner = ({ breadcrumbs }) => {
  return (
    <div className="bannerContainer">
      {breadcrumbs.length > 0 && (
        <div className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && ' > '}
              {crumb}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
