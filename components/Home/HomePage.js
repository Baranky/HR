import React from 'react';
import './HomePage.css'; // Stil dosyasını ekleyeceğiz
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="image-section">
       < img src={`${process.env.PUBLIC_URL}/hr.png`} alt="My Custom" className="custom-image" />
      </div>
    </div>
  );
}

export default HomePage;
