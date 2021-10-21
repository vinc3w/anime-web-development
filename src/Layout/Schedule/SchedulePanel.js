import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const days = [
	{ title: "All", url: "" },
	{ title: "Monday", url: "/monday" },
	{ title: "Tuesday", url: "/tuesday" },
	{ title: "Wednesday", url: "/wednesday" },
	{ title: "Thursday", url: "/thrusday" },
	{ title: "Friday", url: "/friday" },
	{ title: "Saturday", url: "/saturday" },
	{ title: "Sunday", url: "/sunday" },
	{ title: "Other", url: "/other" },
	{ title: "Unknown", url: "/unknown" }
];

function SchedulePanel({ day }) {

	const [links, setLinks] = useState(null);

	useEffect(() => {

		setLinks(
			days.map(({ title, url }, index) => (
				<li
					key={index}
					className={(day || "") === url.slice(1) ? "on-here": ""}
				>
					<Link to={`/schedule${url}`}>{ title }</Link>
				</li>
			))
		);

	}, [day])

	return (
		<ul className="schedule-panel">
			<li className="title">Day</li>
			{ links }
		</ul>
	);
}

export default SchedulePanel;