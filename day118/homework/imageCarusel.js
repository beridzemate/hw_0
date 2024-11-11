import React, { useState } from 'react';

const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/200',
  'https://via.placeholder.com/250'
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div>
      <button onClick={prevImage}>Previous</button>
      <img src={images[currentIndex]} alt="carousel" />
      <button onClick={nextImage}>Next</button>
    </div>
  );
}

export default ImageCarousel;
