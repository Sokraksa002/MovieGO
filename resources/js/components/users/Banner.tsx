import { useState } from 'react';

// Example latest recommended media (replace with API data)
const recommended = [
  {
    id: 1,
    title: "Sonic the Hedgehog",
    poster: "/path-to-sonic.jpg",
    year: "2022",
    duration: "1h 39m",
    genre: "Adventure",
    description: "Sonic and his friends embark on a new adventure to save the world from Dr. Robotnik.",
    link: "/movies/3",
    background: "https://image.tmdb.org/t/p/original/path-to-sonic-background.jpg",
  },
  {
    id: 2,
    title: "Ad Astra",
    poster: "/path-to-ad-astra.jpg",
    year: "2022",
    duration: "2h 4m",
    genre: "Sci-fi",
    description: "An astronaut undertakes a mission across the solar system to uncover the truth about his missing father.",
    link: "/movies/4",
    background: "https://image.tmdb.org/t/p/original/path-to-ad-astra-background.jpg",
  },
  {
    id: 3,
    title: "Frozen II",
    poster: "/path-to-frozen.jpg",
    year: "2022",
    duration: "1h 43m",
    genre: "Animation",
    description: "Elsa, Anna, Kristoff, and Olaf set out on a journey to discover the origin of Elsa's magical powers.",
    link: "/movies/5",
    background: "https://image.tmdb.org/t/p/original/path-to-frozen-background.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const media = recommended[current];

  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] px-6 py-20 flex items-center transition-all duration-500"
      style={{
        backgroundImage: `url(${media.background})`,
      }}
    >
      <div className="max-w-2xl bg-black/60 p-8 rounded-lg">
        <h1 className="text-5xl font-bold leading-tight text-white">
          {media.title}
        </h1>
        <div className="flex items-center mt-4 space-x-4 text-sm text-gray-300">
          <span>• {media.year}</span>
          <span>• {media.duration}</span>
          <span>• {media.genre}</span>
        </div>
        <p className="mt-4 text-gray-400">{media.description}</p>
        <div className="mt-6 flex gap-4">
          <button
            className="px-5 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300"
            onClick={() => window.location.href = media.link}
          >
            Watch now
          </button>
        </div>
        <div className="flex gap-2 mt-6">
          {recommended.map((item, idx) => (
            <button
              key={item.id}
              className={`w-3 h-3 rounded-full ${idx === current ? 'bg-yellow-400' : 'bg-gray-400'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;