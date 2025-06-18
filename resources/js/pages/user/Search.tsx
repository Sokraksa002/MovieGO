import { useState } from 'react';
import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Example movie data (replace with API data)
const movies = [
	{
		id: 1,
		title: 'Wonder Woman 1984',
		poster: '/path-to-wonder-woman.jpg',
		genre: 'Action',
		release_date: '2021',
		vote_average: 8.5,
		link: '/movies/1',
	},
	{
		id: 2,
		title: 'Tom & Jerry',
		poster: '/path-to-tom-and-jerry.jpg',
		genre: 'Comedy',
		release_date: '2021',
		vote_average: 8.1,
		link: '/movies/2',
	},
	{
		id: 3,
		title: 'Venom: Let There Be Carnage',
		poster: '/path-to-venom.jpg',
		genre: 'Action',
		release_date: '2021',
		vote_average: 7.9,
		link: '/movies/3',
	},
	// ...more movies
];

const Search = () => {
	const [query, setQuery] = useState('');
	const filtered = movies.filter(
		(movie) =>
			movie.title.toLowerCase().includes(query.toLowerCase()) ||
			movie.genre.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 px-6 py-10">
				<h1 className="text-2xl font-bold mb-6">Search Results</h1>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search by title or genre..."
					className="mb-8 px-4 py-2 rounded bg-zinc-800 text-white w-full max-w-md outline-none"
				/>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
					{filtered.map((movie) => (
						<MediaCard
							key={movie.id}
							title={movie.title}
							poster={movie.poster}
							subtitle={movie.release_date}
							episode={`⭐ ${movie.vote_average}`}
							link={movie.link}
						/>
					))}
				</div>
				{filtered.length === 0 && (
					<div className="text-gray-400 mt-12">No results found.</div>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default Search;