import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Define TypeScript interface for Media
interface Media {
  id: number;
  title: string;
  poster_url: string;
  year: string;
  rating: number;
  type?: string;
  genres: Genre[];
}

interface Genre {
  id: number;
  name: string;
}

const Search = () => {
  const [medias, setMedias] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use Inertia form for server-side search
  const { data, setData, get, processing } = useForm({
    query: new URLSearchParams(window.location.search).get('q') || '',
  });

  // Fetch media from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Directly query the database through Laravel controller
        const response = await fetch(`/search/api?q=${encodeURIComponent(data.query)}`);
        const result = await response.json();
        
        setMedias(result.media || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error searching media:', error);
        setIsLoading(false);
      }
    };

    // Initial load or when query changes
    if (data.query) {
      fetchData();
    } else {
      // Load some default media if no query
      setIsLoading(true);
      fetch('/popular/api')
        .then(res => res.json())
        .then(data => {
          setMedias(data.media || []);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error fetching popular media:', err);
          setIsLoading(false);
        });
    }
  }, [data.query]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    get('/search', {
      preserveState: true,
      only: []
    });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Search Results</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <input
            type="text"
            value={data.query}
            onChange={e => setData('query', e.target.value)}
            placeholder="Search by title or genre..."
            className="px-4 py-2 rounded bg-zinc-800 text-white w-full max-w-md outline-none"
          />
          <button 
            type="submit" 
            className="mt-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition"
            disabled={processing}
          >
            {processing ? 'Searching...' : 'Search'}
          </button>
        </form>

        {isLoading ? (
          <div className="text-gray-400">Loading media...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {medias.map((media) => (
                <MediaCard
                  key={media.id}
                  title={media.title}
                  poster={media.poster_url}
                  subtitle={media.year}
                  episode={`⭐ ${media.rating}`}
                  link={media.type === 'tv_show' ? `/tv-shows/${media.id}` : `/movies/${media.id}`}
                />
              ))}
            </div>
            {medias.length === 0 && data.query && (
              <div className="text-gray-400 mt-12">
                No results found for "{data.query}"
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;