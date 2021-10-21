import { useState, useEffect, useRef } from "react";
import { Switch, Route, useParams, Link } from "react-router-dom";
import { xhr } from "../../utils/index";
import { Home, CharactersStaff, Episodes, News, Pictures, Videos, Stats, Recommendations, Reviews } from "./Pages";
import SidePanel from "./SidePanel";
import Throbber from "../../Components/Throbber";
import Error from "../../Components/Error";

function AnimeManga() {

	const { type, id, subtype } = useParams();
	const [mainData, setMainData] = useState(null);
	const [data, setData] = useState(null);
  const [breakLayout, setBreakLayout] = useState(false);
	const [connectionError, setConnectionError] = useState(false);
	const isUnmounted = useRef(false);

	const fetchData = async (url, setter) => {
		isUnmounted.current =  false;
		try {
			const response = await xhr("GET", url);
			const parsed = JSON.parse(response);
			if (isUnmounted.current) return;
			setter(parsed);
		} catch(err) {
			if (isUnmounted.current) return;
			setConnectionError(true);
			setter(<Error message="No Connection" />);
		}
	}

	useEffect(() => {

		fetchData(`https://api.jikan.moe/v3/${type}/${id}`, setMainData);
		return () => isUnmounted.current = true;

	}, [type, id])

	useEffect(() => {

		if (
			!subtype ||
			subtype === "episodes" ||
			subtype === "reviews"
		) return setData(true);
		fetchData(`https://api.jikan.moe/v3/${type}/${id}/${subtype}`, setData);
		return () => {
			setData(null);
			isUnmounted.current = true;
		}

	}, [type, id, subtype])

	useEffect(() => {

		document.title = `${type[0].toUpperCase () + type.slice(1)} - ${mainData ? mainData.title : ""} | ANIME WEB`;

	}, [mainData, type])

  useEffect(() => {

    const handleWindowResize = () => setBreakLayout(
			window.innerWidth <= 720 ? true : false
		);

    handleWindowResize();

    window.onresize = handleWindowResize;

  }, [])

	return mainData ? connectionError ? mainData : (
		<>
		{
			breakLayout &&
			<nav className="anime-manga-nav">
				<div className="heading-title">
					<span>{ mainData.title }</span>
				</div>
				<Link to={`/${type}/${mainData.mal_id}/pictures`}>
					<img src={mainData.image_url} alt="" />
				</Link>
				<ul>
					<li><Link to={`/${type}/${mainData.mal_id}`}>{ mainData.title }</Link></li>
					{
						type === "anime" ?
						<>
						<li><Link to={`/${type}/${mainData.mal_id}/videos`}>Videos</Link></li>
						<li><Link to={`/${type}/${mainData.mal_id}/episodes`}>Episodes</Link></li>
						<li><Link to={`/${type}/${mainData.mal_id}/characters_staff`}>Characters & Staff</Link></li>
						</> : 
						<li><Link to={`/${type}/${mainData.mal_id}/characters`}>Characters</Link></li>
					}
					<li><Link to={`/${type}/${mainData.mal_id}/pictures`}>Pictures</Link></li>
					<li><Link to={`/${type}/${mainData.mal_id}/reviews`}>Reviews</Link></li>
					<li><Link to={`/${type}/${mainData.mal_id}/news`}>News</Link></li>
					<li><Link to={`/${type}/${mainData.mal_id}/stats`}>Stats</Link></li>
					<li><Link to={`/${type}/${mainData.mal_id}/recommendations`}>Recommendations</Link></li>
				</ul>
			</nav>
		}
		<div className={subtype ? "anime-manga " + subtype : "anime-manga home"}>
			<Switch>
				<Route exact path="/:type/:id">
					<Home data={mainData} breakLayout={breakLayout} />
				</Route>
				<Route path={["/anime/:id/characters_staff", "/manga/:id/characters"]}>
					<CharactersStaff title={mainData.title} charactersStaff={data} type={type} />
				</Route>
				<Route path="/:type/:id/news">
					<News title={mainData.title} news={data} />
				</Route>
				<Route path="/:type/:id/pictures">
					<Pictures title={mainData.title} pictures={data} />
				</Route>
				<Route path="/anime/:id/videos">
					<Videos title={mainData.title} videos={data} />
				</Route>
				<Route path="/:type/:id/stats">
					<Stats title={mainData.title} stats={data} type={type} />
				</Route>
				<Route path="/:type/:id/recommendations">
					<Recommendations title={mainData.title} recommendations={data} />
				</Route>
				<Route path="/anime/:id/episodes">
					<Episodes title={mainData.title} />
				</Route>
				<Route path="/:type/:id/reviews">
					<Reviews title={mainData.title} />
				</Route>
			</Switch>
		</div>
		<SidePanel breakLayout={breakLayout} data={mainData} type={type} />
		</>
	) :
	(
		<div className="anime-manga">
			<div className="throbber-container">
				<Throbber />
			</div>
		</div>
	)
}

export default AnimeManga;