import { useState, useEffect, useRef } from "react";
import { useHistory, useParams, Link, useLocation } from "react-router-dom";
import SelectMenu from "../../Components/SelectMenu";

function SeasonPanel({ setData }) {

	const params = useParams();
	const [season, setSeason] = useState(params.season);
	const input = useRef(null);
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {

		if (input.current) input.current.value = parseInt(params.year);

	}, [])

	const handleSubmit = () => {
		if (!input.current.value || !season) return;
		setData(null);
		history.push(`/season/${input.current.value}/${season}`);
	}

	return (
		<>
			{
				setData &&
				<ul className="season-panel-search">
					<li className="title">Search</li>
					<li>
						<SelectMenu
							options={[
								{ title: "season" },
								{ title: "Summer", value: "summer" },
								{ title: "Spring", value: "spring" },
								{ title: "Fall", value: "fall" },
								{ title: "Winter", value: "winter" }
							]}
							setSelected={setSeason}
							selected={season}
						/>
					</li>
					<li>
						<input type="number" placeholder="Year" ref={input} />
					</li>
					<li>
						<button onClick={handleSubmit}>Search</button>
					</li>
				</ul>
			}
			<ul className="season-panel-nav">
				<li className="title">More</li>
				<li className={location.pathname === "/season" ? "on-here" : ""}><Link to="/season">Home</Link></li>
				<li className={location.pathname === "/season/archive" ? "on-here" : ""}><Link to="/season/archive">Archive</Link></li>
				<li className={location.pathname === "/season/later" ? "on-here" : ""}><Link to="/season/later">Later</Link></li>
			</ul>
		</>
	);
}

export default SeasonPanel;