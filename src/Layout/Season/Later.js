import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";
import GridBox from "../../Components/GridBox";
import Throbber from "../../Components/Throbber";
import SeasonPanel from "./SeasonPanel";

function Later({ setSidePanelAddOn, showSeasonPanel }) {

	const [data, setData] = useState(null);
	const isUnmounted = useRef(false);

	useEffect(() => {

		const fetchData = async () => {
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/season/later`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
  
				const items = parsed.anime.map((item, index) =>(
					<GridBox key={index} item={item} typeOfItem="anime" />
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

	}, [])

	return (
		<>
		<div className="heading-title">
			<span>Later</span>
		</div>
		{
			!showSeasonPanel &&
			<div className="season-panel">
				<SeasonPanel />
			</div>
		}
		<div className="grid-box-container">
			{
				data ||
				<div className="throbber-container">
					<Throbber />
				</div>
			}
		</div>
		</>
	);
}

export default Later;