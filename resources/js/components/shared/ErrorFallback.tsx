import React from 'react';
import { Link } from '@inertiajs/react';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  className?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again later.',
  showHomeButton = true,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="bg-zinc-900 rounded-lg p-8 max-w-md w-full">
        <ExclamationTriangleIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-400 mb-6">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
          
          {showHomeButton && (
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Go Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

interface NotFoundProps {
  title?: string;
  message?: string;
  type?: 'movie' | 'tv' | 'page';
}

const NotFound: React.FC<NotFoundProps> = ({
  title,
  message,
  type = 'page'
}) => {
  const defaultTitles = {
    movie: 'Movie Not Found',
    tv: 'TV Show Not Found',
    page: 'Page Not Found'
  };

  const defaultMessages = {
    movie: 'The movie you are looking for does not exist or has been removed.',
    tv: 'The TV show you are looking for does not exist or has been removed.',
    page: 'The page you are looking for does not exist or has been moved.'
  };

  return (
    <ErrorFallback
      title={title || defaultTitles[type]}
      message={message || defaultMessages[type]}
      showHomeButton={true}
      className="min-h-[50vh]"
    />
  );
};

export default ErrorFallback;
export { NotFound };
