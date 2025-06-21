import React from 'react';

interface SimpleStreamingPlayerProps {
  tmdbId: number;
  type: 'movie' | 'tv';
  season?: number;
  episode?: number;
  title: string;
  onClose?: () => void;
}

const SimpleStreamingPlayer: React.FC<SimpleStreamingPlayerProps> = ({
  tmdbId,
  type,
  season,
  episode,
  title,
  onClose
}) => {
  const streamingUrl = type === 'tv' && season && episode
    ? `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`
    : `https://vidsrc.to/embed/movie/${tmdbId}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
        >
          ✕
        </button>

        {/* Video Title */}
        <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
          <h3 className="font-semibold">
            {title}
            {type === 'tv' && season && episode && ` - S${season}E${episode}`}
          </h3>
        </div>

        {/* Video Iframe */}
        <iframe
          src={streamingUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`${title} Video Player`}
        />
      </div>
    </div>
  );
};

export default SimpleStreamingPlayer;
