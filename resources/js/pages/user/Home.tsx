import Navbar from '../../components/users/Navbar';
import Banner from '../../components/users/Banner';
import { Link } from '@inertiajs/react';
import MovieSection from '../../components/users/MovieSection';
import TVShowSection from '../../components/users/TVShowSection';
import Footer from '../../components/users/Footer';

// Example static data (replace with TMDB API data later)
const popularMovies = [
  { id: 1, title: "Wonder Woman 1984", poster_path: "/path-to-wonder-woman.jpg", release_date: "2021", vote_average: 8.5 },
  { id: 2, title: "Tom & Jerry", poster_path: "/path-to-tom-and-jerry.jpg", release_date: "2021", vote_average: 8.1 },
  { id: 3, title: "Popular Movie 3", poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg", release_date: "2021-03-01", vote_average: 7.9 },
  { id: 4, title: "Popular Movie 4", poster_path: "/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg", release_date: "2021-04-01", vote_average: 7.8 },
  { id: 5, title: "Popular Movie 5", poster_path: "/h1B7tW0t399VDjAcWJh8m87469b.jpg", release_date: "2021-05-01", vote_average: 7.7 },
];

const latestMovies = [
  { id: 6, title: "Sonic the Hedgehog", poster_path: "/path-to-sonic.jpg", release_date: "2022", vote_average: 7.8 },
  { id: 7, title: "Latest Movie 2", poster_path: "/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg", release_date: "2022-02-01", vote_average: 7.8 },
  { id: 8, title: "Latest Movie 3", poster_path: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg", release_date: "2022-03-01", vote_average: 7.7 },
  { id: 9, title: "Latest Movie 4", poster_path: "/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg", release_date: "2022-04-01", vote_average: 7.6 },
  { id: 10, title: "Latest Movie 5", poster_path: "/keym7MPn1icW1wWfzMnW3HeuzWU.jpg", release_date: "2022-05-01", vote_average: 7.5 },
];

const allMovies = [
  { id: 11, title: "Ad Astra", poster_path: "/path-to-ad-astra.jpg", release_date: "2022", vote_average: 7.7 },
  { id: 12, title: "Movie 2", poster_path: "/h1B7tW0t399VDjAcWJh8m87469b.jpg", release_date: "2020-02-01", vote_average: 7.4 },
  { id: 13, title: "Movie 3", poster_path: "/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg", release_date: "2020-03-01", vote_average: 7.3 },
  { id: 14, title: "Movie 4", poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", release_date: "2020-04-01", vote_average: 7.2 },
  { id: 15, title: "Movie 5", poster_path: "/6KErczPBROQty7QoIsaa6wJYXZi.jpg", release_date: "2020-05-01", vote_average: 7.1 },
];

const popularTVShows = [
  { id: 1, name: "Squid Game", poster_path: "/path-to-squid-game.jpg", first_air_date: "2021", vote_average: 8.9 },
  { id: 2, name: "Popular TV Show 2", poster_path: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg", first_air_date: "2021-02-01", vote_average: 8.0 },
  { id: 3, name: "Popular TV Show 3", poster_path: "/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg", first_air_date: "2021-03-01", vote_average: 7.9 },
  { id: 4, name: "Popular TV Show 4", poster_path: "/h1B7tW0t399VDjAcWJh8m87469b.jpg", first_air_date: "2021-04-01", vote_average: 7.8 },
  { id: 5, name: "Popular TV Show 5", poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", first_air_date: "2021-05-01", vote_average: 7.7 },
];

const Home = () => (
  <div className="bg-black text-white min-h-screen flex flex-col">
    <Navbar />
    <Banner />
    <main className="flex-1 px-6 py-10 space-y-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Popular Movies</h2>
        <Link href="/movies/popular" className="text-yellow-400 hover:underline font-semibold pr-8">See All</Link>
      </div>
      <MovieSection title="" movies={popularMovies} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Latest Movies</h2>
        <Link href="/movies/latest" className="text-yellow-400 hover:underline font-semibold pr-8">See All</Link>
      </div>
      <MovieSection title="" movies={latestMovies} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Movies</h2>
        <Link href="/movies" className="text-yellow-400 hover:underline font-semibold pr-8">See All</Link>
      </div>
      <MovieSection title="" movies={allMovies} />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">TV Shows</h2>
        <Link href="/tv-shows" className="text-yellow-400 hover:underline font-semibold pr-8">See All</Link>
      </div>
      <TVShowSection title="" shows={popularTVShows} />
    </main>
    <Footer />
  </div>
);

export default Home;