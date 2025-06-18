import { Link } from '@inertiajs/react';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date?: string;
  vote_average?: number;
};

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  seeAllLink?: string;
}

const MovieSection = ({ title, movies, seeAllLink }: MovieSectionProps) => (
  <section className="my-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {seeAllLink && (
        <Link href={seeAllLink} className="text-yellow-400 hover:underline">
          See All
        </Link>
      )}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="bg-zinc-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
          <div className="p-3">
            <h3 className="text-lg font-semibold text-white truncate">{movie.title}</h3>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>⭐ {movie.vote_average}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default MovieSection;