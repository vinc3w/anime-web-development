import { useState, useEffect, useRef } from "react";
import { xhr } from "../../utils/index";
import { useParams } from "react-router-dom";
import Error from "../../Components/Error";
import GridBox from "../../Components/GridBox";
import Throbber from "../../Components/Throbber";
import SeasonPanel from "./SeasonPanel";

function Season({ setSidePanelAddOn, showSeasonPanel }) {

	const [data, setData] = useState(null);
	const [time, setTime] = useState(null);
	const { year, season } = useParams();
	const isUnmounted = useRef(false);

	useEffect(() => {

		const fetchData = async () => {
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/season${year ? "/" + year : ""}${season ? "/" + season : ""}`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;

				if (!parsed.anime) return setData(<Error message="No results" />);
  
				const items = parsed.anime.map((item, index) =>(
					<GridBox key={index} item={item} typeOfItem="anime" />
				));

				setData(items);
				setTime(`${parsed.season_year} ${parsed.season_name}`);
			} catch(err) {
				if (isUnmounted.current) return;
				setData(<Error message="No connection" />);
			}
		}

		fetchData();

		return () => isUnmounted.current = true;

	}, [year, season])

	useEffect(() => {

		setSidePanelAddOn(showSeasonPanel && <SeasonPanel setData={setData} />);
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showSeasonPanel])

	useEffect(() => {

		document.title = `Season ${time ? "- " + time + " " : ""}| ANIME WEB`;

	}, [season, year, time])

	return (
		<>
			<div className="heading-title">
				<span>Season - { time }</span>
			</div>
			{
				!showSeasonPanel &&
				<div className="season-panel">
					<SeasonPanel setData={setData} />
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

export default Season;