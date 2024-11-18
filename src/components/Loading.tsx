import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading-container flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <img
          src="../assets/ted.jpg" // Add the path to your TED logo image
          alt="TED Logo"
          className="w-24 h-24 animate-spin" // You can adjust the size and animation of the logo
        />
        <p className="mt-4 text-xl font-semibold">Loading TED Talks...</p>
      </div>
    </div>
  );
};

export default Loading;
