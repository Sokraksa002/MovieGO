import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';

const movie = {
  title: "Squid Game Season 3",
  poster: "/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
  description:
    "Contestants compete in deadly games for a huge cash prize. The new season brings even more suspense and drama.",
  releaseDate: "2024-06-27",
  genres: ["Thriller", "Drama"],
  rating: 8.7,
  duration: "8 Episodes",
  episodes: 8,
};

const MovieDetail = () => (
  <div className="bg-black text-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 px-6 py-10 flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
      <div className="flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full max-w-xs object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
            <span>• {movie.duration}</span>
            <span>• {movie.genres.join(', ')}</span>
            <span>⭐ {movie.rating}</span>
          </div>
          <p className="mb-6 text-gray-300">{movie.description}</p>
          {movie.episodes && (
            <div className="mb-4 text-sm text-gray-400">
              Episodes: {movie.episodes}
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition">
            Watch Now
          </button>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default MovieDetail;