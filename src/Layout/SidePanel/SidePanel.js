import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { xhr } from "../../utils/index";

function SidePanel({ children }) {

  const [upcomingAnime, setUpcomingAnime] = useState(null);
  const [airingAnime, setAiringAnime] = useState(null);
  const [popularManga, setPopularManga] = useState(null);
  const isUnmounted = useRef(false);

  async function list(type, subtype, setter) {
    isUnmounted.current = false;
    const response = await xhr(
      "GET",
      `https://api.jikan.moe/v3/top/${type}/1/${subtype}`
    );
    const top = JSON.parse(response).top;
    if (isUnmounted.current) return;
    setter(
      top.slice(0, 10).map((item, index) => (
        <li key={index}>
          <Link to={`/${type}/${item.mal_id}`}>{ item.title }</Link>
        </li>
      ))
    );
  }

  useEffect(() => {

    if (!upcomingAnime) list("anime", "upcoming", setUpcomingAnime);
    if (!airingAnime) list("anime", "airing", setAiringAnime);
    if (!popularManga) list("manga", "bypopularity", setPopularManga);

    return () => isUnmounted.current = true;

  }, [])

  return (
    <div className="side-panel">
      { children }
      <ul>
        <li className="title">Upcoming Anime</li>
        { upcomingAnime }
        <li><Link to="/anime/top/upcoming">See more</Link></li>
      </ul>
      <ul>
        <li className="title">Airing Anime</li>
        { airingAnime }
        <li><Link to="/anime/top/airing">See more</Link></li>
      </ul>
      <ul>
        <li className="title">Popular Manga</li>
        { popularManga }
        <li><Link to="/manga/top/bypopularity">See more</Link></li>
      </ul>
    </div>
  );
}

export default SidePanel;