import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";
import Throbber from "../../Components/Throbber";
import SeasonPanel from "./SeasonPanel";

function Item({ item }) {

	const years = [];

	for (let i = 0; i < item.seasons.length; i++) {
		years.push(
			<td key={i}>
				<Link to={`/season/${item.year}/${item.seasons[i].toLowerCase()}`}>
					{ item.year }
				</Link>
			</td>
		)
	}

	return (
		<tr>{ years }</tr>
	);
}

function Archive({ setSidePanelAddOn, showSeasonPanel }) {

	const [data, setData] = useState(null);
	const isUnmounted = useRef(false);

	useEffect(() => {

		document.title = "Season Archive | ANIME WEB";

		const fetchData = async () => {
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/season/archive`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
	
				const items = parsed.archive.map((item, index) =>(
					<Item key={index} item={item} />
				));
	
				setData(items);
			} catch(err) {
				if (isUnmounted.current) return;
				setData(<Error message="No connection" />);
			}
		}

		setSidePanelAddOn(showSeasonPanel && <SeasonPanel />);
	
		fetchData();

		return () => isUnmounted.current = true;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
		<div className="heading-title">
			<span>Season Archive</span>
		</div>
		{
			!showSeasonPanel &&
			<div className="season-panel">
				<SeasonPanel />
			</div>
		}
		<table>
			<tbody>
				<tr>
					<td>Winter</td>
					<td>Spring</td>
					<td>Summer</td>
					<td>Fall</td>
				</tr>
				{ data }
			</tbody>
		</table>
		{
			!data &&
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	);
}

export default Archive;