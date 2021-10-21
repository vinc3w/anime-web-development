import { useState, useEffect, useRef } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { xhr } from "../../utils/index";
import Home from "./Home";
import Pictures from "./Pictures";
import Error from "../../Components/Error";
import Throbber from "../../Components/Throbber";

function CharacterPerson() {

	const [mainData, setMainData] = useState(null);
	const [data, setData] = useState(null);
	const [connectionError, setConnectionError] = useState(false);
	const { type, id, subtype } = useParams();
	const isUnmounted = useRef(false);

	const fetchData = async (url, setter) => {
		isUnmounted.current = false;
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

		if (subtype === "pictures") {
			fetchData(`https://api.jikan.moe/v3/${type}/${id}/pictures`, setData);
		}

		return () => isUnmounted.current = true;

	}, [type, id, subtype])

	useEffect(() => {

		document.title = `${type[0].toUpperCase () + type.slice(1)} - ${mainData ? mainData.name : ""} | ANIME WEB`;

	}, [mainData, type])

	return (
		<div className={subtype ? "character-person " + subtype : "character-person home-page"}>
			{
				connectionError ?
				data || mainData : 
				<Switch>
					<Route exact path="/:type/:id">
						{
							mainData ?
							<Home data={mainData} type={type} /> :
							<div className="throbber-container">
								<Throbber />
							</div>
						}
					</Route>
					<Route exact path="/:type/:id/pictures">
						{
							(mainData && data) ?
							<Pictures type={type} data={mainData} pictures={data} /> :
							<div className="throbber-container">
								<Throbber />
							</div>
						}
					</Route>
				</Switch>
			}
		</div>
	);
}

export default CharacterPerson;