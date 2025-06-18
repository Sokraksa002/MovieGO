const Footer = () => (
  <footer className="bg-zinc-900 text-zinc-300 py-6 text-center mt-12">
    <div>
      &copy; {new Date().getFullYear()} MovieStream. All rights reserved.
    </div>
    <div className="mt-2 text-sm">
      Powered by{" "}
      <a
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-400 underline"
      >
        TMDB API
      </a>
    </div>
  </footer>
);
export default Footer;