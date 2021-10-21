import { Link } from "react-router-dom";
import { date } from "../../utils/index";

function Va({ data }) {
	return (
		<>
		<div className="heading">
			<span>Voice Actors</span>
		</div>
		{
			data.length ? data.map((item, index) => (
				<div className="va">
					<div className="item" key={index}>
						<Link to={`/person/${item.mal_id}`}>
							<div className="img" style={{backgroundImage: `url("${item.image_url}")`}}></div>
						</Link>
						<div>
							<Link to={`/person/${item.mal_id}`}>
								<span>{ item.name }</span>
							</Link>
							<span>{ item.language }</span>
						</div>
					</div>
				</div>
			)) : <h2>None</h2>
		}
		</>
	);
}

function AppearIn({ data, type }) {
	return (
		<>
		<div className="heading">
			<span>{ type === "anime" ? "Animeography" : "Mangaography" }</span>
		</div>
		{
			data.length ? data.map((item, index) => (
				<div className="item" key={index}>
					<Link to={`/${type}/${item.mal_id}`}>
						<div className="img" style={{backgroundImage: `url("${item.image_url}")`}}></div>
					</Link>
					<div>
						<Link to={`/${type}/${item.mal_id}`}>
							<span>{ item.name }</span>
						</Link>
						<span>{ item.role }</span>
					</div>
				</div>
			)) : <h2>None</h2>
		}
		</>
	);
}

function AnimeStaffPosition({ data }) {
	return (
		<>
		<div className="heading">
			<span>Anime Staff Positions</span>
		</div>
		{
			data.length ? data.map((item, index) => (
				<div className="item" key={index}>
					<Link to={`/anime/${item.anime.mal_id}`}>
						<div className="img" style={{backgroundImage: `url("${item.anime.image_url}")`}}></div>
					</Link>
					<div>
						<Link to={`/anime/${item.anime.mal_id}`}>
							<span>{ item.anime.name }</span>
						</Link>
						<span>{ item.position }</span>
					</div>
				</div>
			)) : <h2>None</h2>
		}
		</>
	);
}

function VaRoles({ data }) {
	return (
		<>
		<div className="heading">
			<span>Voice Acting Roles</span>
		</div>
		{
			data.length ? data.map((item, index) => (
				<div className="item-2" key={index}>
					<div className="item">
						<Link to={`/anime/${item.anime.mal_id}`}>
							<div className="img" style={{backgroundImage: `url("${item.anime.image_url}")`}}></div>
						</Link>
						<div>
							<Link to={`/anime/${item.anime.mal_id}`}>
								<span>{ item.anime.name }</span>
							</Link>
						</div>
					</div>
					<div className="item">
						<div>
							<Link to={`/character/${item.character.mal_id}`}>
								<span>{ item.character.name }</span>
							</Link>
							<span>{ item.role }</span>
						</div>
						<Link to={`/character/${item.character.mal_id}`}>
							<div className="img" style={{backgroundImage: `url("${item.character.image_url}")`}}></div>
						</Link>
					</div>
				</div>
			)) : <h2>None</h2>
		}
		</>
	);
}

function PublishedManga({ data }) {
	return (
		<>
		<div className="heading">
			<span>Published Manga</span>
		</div>
		{
			data.length ? data.map((item, index) => (
				<div className="item" key={index}>
					<Link to={`/manga/${item.manga.mal_id}`}>
						<div className="img" style={{backgroundImage: `url("${item.manga.image_url}")`}}></div>
					</Link>
					<div>
						<Link to={`/manga/${item.manga.mal_id}`}>
							<span>{ item.manga.name }</span>
						</Link>
							<span>{ item.position }</span>
					</div>
				</div>
			)) : <h2>None</h2>
		}
		</>
	);
}

function Home({ type, data }) {

	return (
		<>
		<div className="heading-title">
			<span>{ data.name }{ data.name_kanji && " - " + data.name_kanji }</span>
		</div>
		<div className="top-part">
			<Link className="images-link" to={`/${type}/${data.mal_id}/pictures`}>
				<img src={data.image_url} alt="" />
				<span>See more pictures</span>
			</Link>
			<div className="content">
				<p>{ data.about }</p>
				<ul className="info-list">
					{
						type === "character" &&
						<li>
							<span className="label">NICKNAMES:</span>
							<span className="value">{  data.nicknames?.length ? data.nicknames.join(", ") : "none" }</span>
						</li>
					}
					{
						type === "person" &&
						<>
						<li>
							<span className="label">ALTERNATE NAMES:</span>
							<span className="value">{ data.alternate_names?.length ? data.alternate_names.join(", ") : "none" }</span>
						</li>
						<li>
							<span className="label">FAMILY NAME:</span>
							<span className="value">{ data.family_name }</span>
						</li>
						<li>
							<span className="label">GIVEN NAME:</span>
							<span className="value">{ data.given_name }</span>
						</li>
						<li>
							<span className="label">BIRTHDAY:</span>
							<span className="value">{ date.convertISO8601(data.birthday) }</span>
						</li>
						<li>
							<span className="label">WEBSITE:</span>
							<span className="value">
								<a target="_blank" rel="noreferrer" to={data.website_url}>Click here</a>
							</span>
						</li>
						</>
					}
					<li>
						<span className="label">FAVOURITES:</span>
						<span className="value">{ data.member_favorites }</span>
					</li>
				</ul>
			</div>
		</div>
		{
			type === "character" &&
			<>
			<AppearIn data={data.animeography} type="anime" />
			<AppearIn data={data.mangaography} type="manga" />
			<Va data={data.voice_actors} />
			</>
		}
		{
			type === "person" &&
			<>
			<AnimeStaffPosition data={data.anime_staff_positions} />
			<VaRoles data={data.voice_acting_roles} />
			<PublishedManga data={data.published_manga} />
			</>
		}
		</>
	);
} 

export default Home;