import { Link } from "react-router-dom";

function Related({ related }) {
	const items = [];
	let i = 0;

	for (let item in related) {
		items.push(
			<ul key={i}>
				<li className="title">{ item }</li>
				{
					related[item].map(({ mal_id, name, type }, index) => (
						<li key={index}>
							<Link to={`/${type}/${mal_id}`}>{ name }</Link>
						</li>
					))
				}
			</ul>
		);
		i++;
	}

	return items;
}

function ExternalLinks({ externalLinks }) {
	return (
		<ul>
			<li className="title">External Links</li>
			{
				externalLinks.map(({ name, url }, index) => (
					<li key={index}>
						<a target="_blank" rel="noreferrer" href={url}>{ name }</a>
					</li>
				))
			}
		</ul>
	);
}

function Producers({ producers, typeOfItem }) {
	const items = [];
	let i = 0;

	for (let item in producers) {
		if (!producers[item]) continue;
		items.push(
			<ul key={i}>
				<li className="title">{ item }</li>
				{
					producers[item].map(({ name, mal_id }, index) => (
						<li key={index}>
							<Link to={`/${typeOfItem === "anime" ? "producer" : "magazine"}/${mal_id}`}>{ name }</Link>
						</li>
					))
				}
			</ul>
		);
		i++;
	}

	return items;
}

function Score({ score }) {
	const radius = 35;
	const stroke = 5;
	const normalizeRadius = radius - stroke * 2
	const circumference = normalizeRadius * 2 * Math.PI;

	const Stars = () => {
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
		return starsContainer;
	}

	return (
		<div className="score">
			<div className="circle">
				<svg height={ radius * 2 } width={ radius * 2 }>
					<circle
						strokeWidth={ stroke }
						strokeDasharray={ circumference + " " + circumference }
						style={{ strokeDashoffset: circumference - score / 10 * circumference }}
						r={ normalizeRadius }
						cx={ radius }
						cy={ radius }
					/>
				</svg>
				<span>{ Math.floor(score * 10) }%</span>
			</div>
			<div className="info">
				<div><Stars /></div>
				<span>{ score } / 10</span>
			</div>
		</div>
	);
}

function SidePanel({ breakLayout, type, data }) {
	
	return (
		<div className="side-panel anime-manga-side-panel">
			{
				!breakLayout && 
				<>
				<ul className="img">
					<li className="title">Image</li>
					<li>
						<Link to={`/anime/${data.mal_id}/pictures`}>
							<img src={data.image_url} alt="" />
							<Score score={data.score} />
						</Link>
					</li>
				</ul>
				<ul>
					<li className="title">See also</li>
					<li><Link to={`/${type}/${data.mal_id}`}>{ data.title }</Link></li>
					{
						type === "anime" ?
						<>
						<li><Link to={`/${type}/${data.mal_id}/videos`}>Videos</Link></li>
						<li><Link to={`/${type}/${data.mal_id}/episodes`}>Episodes</Link></li>
						<li><Link to={`/${type}/${data.mal_id}/characters_staff`}>Characters & Staff</Link></li>
						</> :
						<li><Link to={`/${type}/${data.mal_id}/characters`}>Characters</Link></li>
					}
					<li><Link to={`/${type}/${data.mal_id}/pictures`}>Pictures</Link></li>
					<li><Link to={`/${type}/${data.mal_id}/reviews`}>Reviews</Link></li>
					<li><Link to={`/${type}/${data.mal_id}/news`}>News</Link></li>
					<li><Link to={`/${type}/${data.mal_id}/stats`}>Stats</Link></li>
					<li><Link to={`/${type}/${data.mal_id}/recommendations`}>Recommendations</Link></li>
				</ul>
				</>
			}
			<ul>
				<li className="title">Alternative Titles</li>
				<li>{ data.title_english }</li>
				<li>{ data.title_japanese }</li>
				{
					data.title_synonyms.map((title, index) => (
						<li key={index}>{ title }</li>
					))
				}
			</ul>
			<Related related={data.related} /> 
			<Producers
				typeOfItem={type}
				producers={{
					Producers: data.producers, Licensors: data.licensors, Studios: data.studios, Serializations: data.serializations
				}}
			/>
			<ExternalLinks externalLinks={data.external_links} />
		</div>
	);
}

export default SidePanel;