import React from 'react';

interface CarouselProps {
  image: string;
}

const Carousel: React.FC<CarouselProps> = ({ image }) => {
  return (
    <div className="carousel-container relative w-full h-full">
      <img
        className="carousel-image object-cover w-full h-full"
        src={image}
        alt="Video background"
      />
    </div>
  );
};

export default Carousel;
