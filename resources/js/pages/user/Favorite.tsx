import Navbar from '../../components/users/Navbar';
import Footer from '../../components/users/Footer';
import MediaCard from '../../components/users/MediaCard';

// Example history list (replace with user's real watch history from API or state)
const historyList = [
  {
    id: 1,
    title: "The Prisoner of Beauty",
    poster: "/vXHzO26mJaOt4VO7ZFiM6No5ScT.jpg",
    subtitle: "Watched Jun 15",
    episode: "EP 36",
    link: "/tv-shows/3",
  },
  {
    id: 2,
    title: "Bright Eyes",
    poster: "/h1B7tW0t399VDjAcWJh8m87469b.jpg",
    subtitle: "Watched Jun 14",
    episode: "EP 24",
    link: "/tv-shows/4",
  },
  {
    id: 3,
    title: "Suntiny",
    poster: "/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg",
    subtitle: "Watched Jun 13",
    episode: "EP 3",
    link: "/tv-shows/7",
  },
];

const HistoryWatch = () => (
  <div className="bg-black text-white min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {historyList.map((item) => (
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
      {historyList.length === 0 && (
        <div className="text-center text-gray-400 mt-12">No watch history yet.</div>
      )}
    </main>
    <Footer />
  </div>
);
export default HistoryWatch;