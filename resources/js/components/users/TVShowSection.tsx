import { Link } from '@inertiajs/react';

type TVShow = {
  id: number;
  name: string;
  poster_path: string;
  first_air_date?: string;
  vote_average?: number;
};

interface TVShowSectionProps {
  title: string;
  shows: TVShow[];
  seeAllLink?: string;
}

const TVShowSection = ({ title, shows, seeAllLink }: TVShowSectionProps) => (
  <section className="my-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {seeAllLink && (
        <Link href={seeAllLink} className="text-orange-400 hover:underline">
          See All
        </Link>
      )}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {shows.map((show) => (
        <Link
          key={show.id}
          href={`/tv-shows/${show.id}`}
          className="bg-zinc-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full h-72 object-cover"
          />
          <div className="p-3">
            <h3 className="text-lg font-semibold text-white truncate">{show.name}</h3>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{show.first_air_date?.slice(0, 4)}</span>
              <span>⭐ {show.vote_average}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default TVShowSection;