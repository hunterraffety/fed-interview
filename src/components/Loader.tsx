import React from 'react';
import tedImage from '../assets/ted.jpg';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
      <div className="text-center">
        <img
          src={tedImage}
          alt="Loading..."
          className="mx-auto mb-4  object-cover rounded-full"
        />
        <p className="text-white text-xl font-semibold">Loading TED Talks...</p>
      </div>
    </div>
  );
};
