import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const subtypes = {
	anime: [
		{ title: "All", url: "" },
		{ title: "Airing", url: "/airing" },
		{ title: "Upcoming", url: "/upcoming" },
		{ title: "TV", url: "/tv" },
		{ title: "Movie", url: "/movie" },
		{ title: "OVA", url: "/ova" },
		{ title: "Special", url: "/special" },
		{ title: "Popular", url: "/bypopularity" },
		{ title: "Favourite", url: "/favorite" }
	],
	manga: [
		{ title: "All", url: "" },
		{ title: "Manga", url: "/manga" },
		{ title: "Novels", url: "/novels" },
		{ title: "Oneshots", url: "/oneshots" },
		{ title: "Doujin", url: "/doujin" },
		{ title: "Manhwa", url: "/manhwa" },
		{ title: "Manhua", url: "/manhua" },
		{ title: "Popular", url: "/bypopularity" },
		{ title: "Favorite", url: "/favorite" }
	]
}

function TopPanel({ type, subtype }) {

	const [links, setLinks] = useState(null);

	useEffect(() => {

		setLinks(
			subtypes[type].map(({ title, url }, index) => (
				<li
					key={index}
					className={(subtype || "") === url.slice(1) ? "on-here": ""}
				>
					<Link to={`/top/${type}${url}`}>{ title }</Link>
				</li>
			))
		);

	}, [type, subtype])

	return (
		<ul className="top-panel">
			<li className="title">Now Showing</li>
			{ links }
		</ul>
	);
}

export default TopPanel;