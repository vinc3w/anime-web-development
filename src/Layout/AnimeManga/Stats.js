import Throbber from "../../Components/Throbber";

function BarChart({ scores }) {

	const items = [];

	for (let score in scores) items.push(
		<li key={score}>
			<span className="score">{ score }</span>
			<div className="bar-container">
				<div className="bar" style={{width: scores[score].percentage + "%"}}></div>
				<span>{ scores[score].votes } voted ({ scores[score].percentage }%)</span>
			</div>
		</li>
	);

	return (
		<div className="bar-chart">
			<ul>
				{ items }
			</ul>
		</div>
	);
}

function Stats({ title, type, stats }) {
	
	return (
		<>
		<div className="heading-title">
			<span>{ title } - Stats</span>
		</div>
		{
			stats ? 
			<>
			<BarChart scores={stats.scores} />
			<ul className="info-list">
				<li>
					<span className="label">COMPLETED:</span>
					<span className="value">{ stats.completed }</span>
				</li>
				<li>
					<span className="label">DROPPED:</span>
					<span className="value">{ stats.dropped }</span>
				</li>
				<li>
					<span className="label">ON HOLD:</span>
					<span className="value">{ stats.on_hold }</span>
				</li>
				{
					type === "anime" &&
					<>
					<li>
						<span className="label">PLAN TO WATCH:</span>
						<span className="value">{ stats.plan_to_watch }</span>
					</li>
					<li>
						<span className="label">WATCHING:</span>
						<span className="value">{ stats.watching }</span>
					</li>
					</>
				}
				{
					type === "manga" &&
					<>
					<li>
						<span className="label">PLAN TO READ:</span>
						<span className="value">{ stats.plan_to_read }</span>
					</li>
					<li>
						<span className="label">READING:</span>
						<span className="value">{ stats.reading }</span>
					</li>
					</>
				}
				<li>
					<span className="label">TOTAL:</span>
					<span className="value">{ stats.total }</span>
				</li>
			</ul>
			</> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	)
}

export default Stats;