import React, { useState } from 'react';

const TestStreamingPlayer: React.FC = () => {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Test Streaming Player</h2>
      <button 
        onClick={() => setShowIframe(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Iframe
      </button>
      
      {showIframe && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowIframe(false)}
              className="absolute top-4 right-4 z-60 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
            
            <iframe
              src="https://vidsrc.xyz/embed/movie?tmdb=680"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="Test Video Player"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TestStreamingPlayer;
