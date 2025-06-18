import { Link } from '@inertiajs/react';

interface MediaCardProps {
  title: string;
  poster: string;
  subtitle?: string;
  episode?: string;
  link: string;
}

const MediaCard = ({ title, poster, subtitle, episode, link }: MediaCardProps) => (
  <Link
    href={link}
    className="bg-zinc-800 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform flex flex-col"
  >
    <div className="relative">
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
        {subtitle && <div className="text-xs text-gray-200">{subtitle}</div>}
        {episode && <div className="text-xs text-gray-300 absolute right-3 bottom-2">{episode}</div>}
      </div>
    </div>
    <div className="p-3 flex-1 flex items-end">
      <h3 className="text-base font-semibold text-white truncate">{title}</h3>
    </div>
  </Link>
);

export default MediaCard;