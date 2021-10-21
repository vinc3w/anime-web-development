import { useState, useEffect, useRef } from "react";
import { Switch, Route, useParams, Link } from "react-router-dom";
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

	useEffect(() => {

		const fetchMainData = async () => {
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/${type}/${id}`
				);
				const parsed = JSON.parse(response);
				console.log(parsed)
				if (isUnmounted.current) return;
				setMainData(parsed);
			} catch(err) {
				if (isUnmounted.current) return;
				setConnectionError(true);
				setMainData(<Error message="No Connection" />);
			}
		}

		fetchMainData();

		return () => isUnmounted.current = true;

	}, [type, id])

	useEffect(() => {

		const fetchData = async () => {
			if (subtype !== "pictures") return;
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/${type}/${id}/pictures`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
				setData(parsed);
			} catch(err) {
				if (isUnmounted.current) return;
				setConnectionError(true);
				setData(<Error message="No Connection" />);
			}
		}

		fetchData();

		return () => isUnmounted.current = true;

	}, [type, id, subtype])

	if (!mainData) return null;

	return (
		<div className={subtype ? "character-person " + subtype : "character-person home-page"}>
			<Switch>
				<Route exact path="/:type/:id">
					<Home data={mainData} type={type} />
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
		</div>
	);
}

export default CharacterPerson;