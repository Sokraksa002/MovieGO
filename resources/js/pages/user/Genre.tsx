import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';
import { useState } from 'react';

// Example genres and data (replace with API data as needed)
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Romance" },
  { id: 4, name: "Comedy" },
  { id: 5, name: "Thriller" },
];

const genreMedia = [
  {
    id: 1,
    title: "Squid Game Season 3",
    poster: "/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
    genre: "Thriller",
    subtitle: "Coming Jun 27",
    episode: "EP 6",
    link: "/tv-shows/1",
  },
  {
    id: 2,
    title: "Bloom Once More",
    poster: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    genre: "Romance",
    subtitle: "Coming Jun 18",
    episode: "EP 4",
    link: "/tv-shows/5",
  },
  {
    id: 3,
    title: "Love My Scent",
    poster: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
    genre: "Romance",
    episode: "EP 1",
    link: "/tv-shows/6",
  },
  {
    id: 4,
    title: "The Prisoner of Beauty",
    poster: "/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg",
    genre: "Drama",
    subtitle: "Unlock All Ep",
    episode: "EP 36",
    link: "/tv-shows/3",
  },
  {
    id: 5,
    title: "Suntiny",
    poster: "/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg",
    genre: "Comedy",
    subtitle: "Coming Jun 17",
    episode: "EP 3",
    link: "/tv-shows/7",
  },
];

const Genre = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMedia = selectedGenre
    ? genreMedia.filter((item) => item.genre === selectedGenre)
    : genreMedia;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Browse by Genre</h1>
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            className={`px-4 py-2 rounded ${selectedGenre === null ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-white'} hover:bg-yellow-300 transition`}
            onClick={() => setSelectedGenre(null)}
          >
            All
          </button>
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`px-4 py-2 rounded ${selectedGenre === genre.name ? 'bg-yellow-400 text-black font-bold' : 'bg-zinc-800 text-white'} hover:bg-yellow-300 transition`}
              onClick={() => setSelectedGenre(genre.name)}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredMedia.map((item) => (
            <MediaCard
              key={item.id}
              title={item.title}
              poster={item.poster}
              subtitle={item.subtitle}
              episode={item.episode}
              link={item.link}
            />
          ))}
        </div>
        {filteredMedia.length === 0 && (
          <div className="text-center text-gray-400 mt-12">No media found for this genre.</div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Genre;