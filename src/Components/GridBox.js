import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function GridBox({ item, typeOfItem }) {

	const { rank, image_url, title, name, type, episodes, score, mal_id, volumes, synopsis, anime, manga, alternative_names } = item;
	const [stars, setStars] = useState();

	useEffect(() => {

		const starsContainer = [];
		for (let j = 0, i = Math.floor(score) / 2; j < 5; j++, i--) {
			starsContainer.push(
				<i
					key={j}
					className={
						i > 0 ? "material-icons checked" : "material-icons"
					}
				>
					star
				</i>
			);
		}
		setStars(starsContainer);

	}, [])

  return (
    <Link className="grid-box" to={`/${typeOfItem}/${mal_id}`}>
      <div
        className="item-img"
        style={{backgroundImage: `url("${image_url}")`}}
      />
			{
				rank && 
				<div className="rank">
					<span>{ rank }</span>
				</div>
			}
			{
				!rank && type !== "Movie" && episodes !== undefined && episodes !== null && 
				<div className="eps">
					<span>{ episodes }</span>
					<span>eps</span>
				</div>
			}
			{
				!rank && type === "Movie" && 
				<div className="movie">
					<span>Movie</span>
				</div>
			}
			{
				!rank && volumes !== undefined && volumes !== null &&
				<div className="parts">
					<span>{ volumes }</span>
					<span>vols</span>
				</div>
			}
      <div className="title">
        <h2 title={title}>
					{ title || name }
					{ alternative_names?.length ? <>&nbsp;({ alternative_names.join(", ") })</> : null }
					{ type && <>&nbsp;({ type })</> }
				</h2>
        { score !== undefined && score !== null && <span>{ stars }</span> }
        { episodes !== undefined && episodes !== null && rank && <span>{ episodes } eps</span> }
        { volumes !== undefined && volumes !== null && rank && <span>{ volumes } vols</span> }
				{ synopsis !== undefined && synopsis !== null && <span>{ synopsis }</span> }
				{
					typeOfItem === "character" &&
					<ul className="info-list">
						{
							anime?.length ?
							<li>
								<span className="label">ANIME:</span>
								<span className="value">
									{
										anime.map((item, index) => (
											<span key={index}>{ item.name }{ index < anime.length - 1 && <>,&nbsp;</> }</span>
										))
									}
								</span>
							</li> : null
						}
						{
							manga?.length ?
							<li>
								<span className="label">MANGA:</span>
								<span className="value">
									{
										manga.map((item, index) => (
											<span key={index}>{ item.name }{ index < manga.length - 1 && <>,&nbsp;</> }</span>
										))
									}
								</span>
							</li> : null
						}
					</ul>
				}
      </div>
    </Link>
  );
}

export default GridBox;