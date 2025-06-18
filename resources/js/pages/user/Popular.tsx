import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Example data (replace with API data as needed)
const popularList = [
	{
		id: 1,
		title: 'Reborn',
		poster: '/6KErczPBROQty7QoIsaa6wJYXZi.jpg',
		subtitle: 'Coming Jun 19',
		episode: 'EP 4',
		link: '/tv-shows/1',
	},
	{
		id: 2,
		title: 'Squid Game Season 3',
		poster: '/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
		subtitle: 'Coming Jun 27',
		episode: 'EP 6',
		link: '/tv-shows/2',
	},
	{
		id: 3,
		title: 'The Prisoner of Beauty',
		poster: '/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg',
		subtitle: 'Unlock All Ep',
		episode: 'EP 36',
		link: '/tv-shows/3',
	},
	{
		id: 4,
		title: 'Bright Eyes',
		poster: '/h1B7tW0t399VDjAcWJh8m87469b.jpg',
		subtitle: 'Machine Translate',
		episode: 'EP 24',
		link: '/tv-shows/4',
	},
	{
		id: 5,
		title: 'Bloom Once More',
		poster: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
		subtitle: 'Coming Jun 18',
		episode: 'EP 4',
		link: '/tv-shows/5',
	},
	{
		id: 6,
		title: 'Love My Scent',
		poster: '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
		episode: 'EP 1',
		link: '/tv-shows/6',
	},
	{
		id: 7,
		title: 'Suntiny',
		poster: '/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg',
		subtitle: 'Coming Jun 17',
		episode: 'EP 3',
		link: '/tv-shows/7',
	},
	{
		id: 8,
		title: 'Lament of the River Immortal - FEUD',
		poster: '/keym7MPn1icW1wWfzMnW3HeuzWU.jpg',
		episode: 'EP 26',
		link: '/tv-shows/8',
	},
	{
		id: 9,
		title: 'The Seven Relics of ill Omen',
		poster: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
		episode: 'EP 22',
		link: '/tv-shows/9',
	},
	{
		id: 10,
		title: "Qingchuan's Veil of Vengeance",
		poster: '/9O1Iy9od7uQ6yFZM1ZbQJ0bqRkP.jpg',
		episode: 'EP 8',
		link: '/tv-shows/10',
	},
	{
		id: 11,
		title: 'Created in China',
		poster: '/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg',
		subtitle: 'Coming Jun 18',
		episode: 'EP 4',
		link: '/tv-shows/11',
	},
	{
		id: 12,
		title: 'Nana bnb with Seventeen',
		poster: '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
		link: '/tv-shows/12',
	},
];

const Popular = () => (
	<div className="bg-black text-white min-h-screen flex flex-col">
		<Navbar />
		<main className="flex-1 px-6 py-10">
			<h1 className="text-2xl font-bold mb-6">Popular</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
				{popularList.map((item) => (
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

export default Popular;