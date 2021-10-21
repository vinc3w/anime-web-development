import { Link } from "react-router-dom";

function CarouselItem({ item }) {

	const { image_url, title, type, episodes, mal_id } = item;

  return (
    <Link to={`/anime/${mal_id}`} className="item">
      <div className="item-img" style={{backgroundImage: `url("${image_url}")`}} />
      <div className="cover">
        <span className="info">
          {
            type === "Movie" ?
            "movie" :
            episodes + " eps"
          }
        </span>
        <span className="title">{ title } ({ type })</span>
      </div>
    </Link>
  );
}

export default CarouselItem;