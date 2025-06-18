import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Example data (replace with API data as needed)
const tvShowList = [
  {
    id: 1,
    title: "Squid Game Season 3",
    poster: "/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
    subtitle: "Coming Jun 27",
    episode: "EP 6",
    link: "/tv-shows/1",
  },
  {
    id: 2,
    title: "The Prisoner of Beauty",
    poster: "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
    subtitle: "Unlock All Ep",
    episode: "EP 36",
    link: "/tv-shows/2",
  },
  {
    id: 3,
    title: "Bright Eyes",
    poster: "/h1B7tW0t399VDjAcWJh8m87469b.jpg",
    subtitle: "Machine Translate",
    episode: "EP 24",
    link: "/tv-shows/3",
  },
  {
    id: 4,
    title: "Lament of the River Immortal - FEUD",
    poster: "/keym7MPn1icW1wWfzMnW3HeuzWU.jpg",
    episode: "EP 26",
    link: "/tv-shows/4",
  },
  {
    id: 5,
    title: "The Seven Relics of ill Omen",
    poster: "/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg",
    episode: "EP 22",
    link: "/tv-shows/5",
  },
  {
    id: 6,
    title: "Qingchuan's Veil of Vengeance",
    poster: "/9O1Iy9od7uQ6yFZM1ZbQJ0bqRkP.jpg",
    episode: "EP 8",
    link: "/tv-shows/6",
  },
  {
    id: 7,
    title: "Nana bnb with Seventeen",
    poster: "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
    link: "/tv-shows/7",
  },
];

const TVShow = () => (
  <div className="bg-black text-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">TV Shows</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tvShowList.map((item) => (
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

export default TVShow;