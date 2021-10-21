import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { xhr } from "../../utils/index";
import Throbber from "../../Components/Throbber";
import Error from "../../Components/Error";

function Genres({ genres }) {
	let items = [];

	for (let item in genres) items = items.concat(genres[item]);

	return (
		<li>
			<span className="label">GENRE:</span>
			<span className="value">
			{
				items.length ? items.map(({ name, type, mal_id }, index) => (
					<span key={index}>
						<Link to={`/genre/${type}/${mal_id}`}>{ name }</Link>
						{ index !== items.length - 1 && <>,&nbsp;</> }
					</span>
				)) : "None"
			}
			</span>
		</li>
	);
}

function Home({ breakLayout, data }) {

	const { type, id, subtype } = useParams();
	const [connectionError, setConnectionError] = useState(false);
	const [moreinfo, setMoreInfo] = useState(null);
	const isUnmounted = useRef(false);

	useEffect(() => {

		const fetchMoreInfo = async () => { 
			isUnmounted.current =  false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/${type}/${id}/moreinfo`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
				setMoreInfo(parsed);
			} catch(err) {
				if (isUnmounted.current) return;
				setMoreInfo(<Error message="No connection" />);
				setConnectionError(true);
			}
		}

		fetchMoreInfo();

		return () => isUnmounted.current = true;

	}, [type, id, subtype])

	return moreinfo ? connectionError ? moreinfo : (
		<>
		{
			!breakLayout && 
			<div className="heading-title">
				<span>{ data.title }</span>
			</div>
		}
		<div className="rank-box">
			<span className="info">
				RANK <span className="rank">#{ data.rank }</span>
			</span>
			<span className="info">
				POPULARITY <span className="rank">#{ data.popularity }</span>
			</span>
			<span className="info">
				FAVORITE <span className="rank">#{ data.favorites }</span>
			</span>
		</div>
		<div className="general">
			<div className="heading">
				<span>General</span>
			</div>
			<p>{ data.synopsis }</p>
			{ data.trailer_url && <iframe src={data.trailer_url} frameBorder="0"></iframe> }
			<ul className="info-list">
				<li>
					<span className="label">TYPE:&nbsp;</span>
					<span className="value">{ data.type }</span>
				</li>
				{
					type === "anime" &&
					<>
					<li>
						<span className="label">AIRED:&nbsp;</span>
						<span className="value">{ data.aired?.string || "None" }</span>
					</li>
					<li>
						<span className="label">AIRING:&nbsp;</span>
						<span className="value">{ data.airing?.toString() || "None" }</span>
					</li>
					<li>
						<span className="label">EPISODES:&nbsp;</span>
						<span className="value">{ data.episodes || "None" }</span>
					</li>
					<li>
						<span className="label">DURATION:&nbsp;</span>
						<span className="value">{ data.duration || "None" }</span>
					</li>
					<li>
						<span className="label">PREMIRED:&nbsp;</span>
						<span className="value">{ data.premiered || "None" }</span>
					</li>
					<li>
						<span className="label">RATING:&nbsp;</span>
						<span className="value">{ data.rating || "None" }</span>
					</li>
					<li>
						<span className="label">SOURCE:&nbsp;</span>
						<span className="value">{ data.source || "None" }</span>
					</li>
					</>
				}
				{
					type === "manga" &&
					<>
					<li>
						<span className="label">CHAPTERS:&nbsp;</span>
						<span className="value">{ data.chapters || "None" }</span>
					</li>
					<li>
						<span className="label">VOLUMES:&nbsp;</span>
						<span className="value">{ data.volumes || "None" }</span>
					</li>
					<li>
						<span className="label">PUBLISHED:&nbsp;</span>
						<span className="value">{ data.published?.string || "None" }</span>
					</li>
					<li>
						<span className="label">PUBLISHING:&nbsp;</span>
						<span className="value">{ data.publishing.toString() }</span>
					</li>
					<li>
						<span className="label">AUTHORS:&nbsp;</span>
						<span className="value">
							{
								data.authors.length ? data.authors.map((author, index) => (
									<Link key={index} to={`/${author.type}/${author.mal_id}`}>{ author.name }</Link>
								)) : "None"
							}
						</span>
					</li>
					</>
				}
				<Genres
					genres={{
						genres: data.genres,
						themes: data.themes,
						demographics: data.demographics,
						explicitGenres: data.explicit_genres
					}}
				/>
			</ul>
		</div>
		<div className="heading-title">
			<span>Background</span>
		</div>
		{
			data.background ?
			<p>{ data.background }</p> :
			<h2>None</h2>
		}
		<div className="heading-title">
			<span>More Info</span>
		</div>
		{
			moreinfo?.moreinfo ?
			<p>{ moreinfo.moreinfo }</p> :
			<h2>None</h2>
		}
		{
			type === "anime" && 
			<div className="themes">
				<div className="heading-title">
					<span>Opening Themes</span>
				</div>
				<ul>
					{
						data.opening_themes.map((theme, index) => (
							<li key={index}>{ theme.slice(theme.indexOf(":") + 1) }</li>
						))
					}
				</ul>
				<div className="heading-title">
					<span>Ending Themes</span>
				</div>
				<ul>
					{
						data.ending_themes.map((theme, index) => (
							<li key={index}>{ theme.slice(theme.indexOf(":") + 1) }</li>
						))
					}
				</ul>
			</div>
		}
		</>
	) : (
		<div className="throbber-container">
			<Throbber/>
		</div>
	);
}

export default Home;