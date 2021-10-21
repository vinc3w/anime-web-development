import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListBox({ item }) {

	const { rank, image_url, title, type, episodes, score, mal_id } = item;
	const [stars, setStars] = useState();

	useEffect(() => {

		const starsContainer = [];
		for (let j = 0, i = Math.floor(score) / 2; j < 5; j++) {
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
			i--;
		}
		setStars(starsContainer);

	}, [score])

	return (
		<div className="list-box">
			<div className="rank">
				<span>{ rank }</span>
			</div>
			<div className="title">
				<Link to={`/anime/${mal_id}`} title={title}>
					<div
						className="item-img"
						style={{backgroundImage: `url("${image_url}")`}}
					/>
				</Link>
				<div className="content">
					<Link className="title-a" to={`/anime/${mal_id}`} title={title}>
						<h2>{ title } <span>{ type }</span></h2>
					</Link>
					<ul className="info-list">
						<li className="info">
							<span className="label">EPS:&nbsp;</span>
							<span className="value">{ episodes || "none" }</span>
						</li>
						<li className="info score">
							<span className="label">SCORE:&nbsp;</span>
							<span className="value">{ stars }</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default ListBox;