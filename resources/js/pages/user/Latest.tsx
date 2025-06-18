import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Example data (replace with API data as needed)
const latestList = [
	{
		id: 1,
		title: 'Bloom Once More',
		poster: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
		subtitle: 'Coming Jun 18',
		episode: 'EP 4',
		link: '/tv-shows/5',
	},
	{
		id: 2,
		title: 'Suntiny',
		poster: '/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
		subtitle: 'Coming Jun 17',
		episode: 'EP 3',
		link: '/tv-shows/7',
	},
	{
		id: 3,
		title: 'Created in China',
		poster: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
		subtitle: 'Coming Jun 18',
		episode: 'EP 4',
		link: '/tv-shows/11',
	},
	{
		id: 4,
		title: 'Reborn',
		poster: '/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
		subtitle: 'Coming Jun 19',
		episode: 'EP 4',
		link: '/tv-shows/1',
	},
	{
		id: 5,
		title: 'Squid Game Season 3',
		poster: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
		subtitle: 'Coming Jun 27',
		episode: 'EP 6',
		link: '/tv-shows/2',
	},
	{
		id: 6,
		title: 'Love My Scent',
		poster: '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
		episode: 'EP 1',
		link: '/tv-shows/6',
	},
];

const Latest = () => (
	<div className="bg-black text-white min-h-screen flex flex-col">
		<Navbar />
		<main className="flex-1 px-6 py-10">
			<h1 className="text-2xl font-bold mb-6">Latest</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{latestList.map((item) => (
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
		</main>
		<Footer />
	</div>
);

export default Latest;