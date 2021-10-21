import { Link } from "react-router-dom";
import Throbber from "../../Components/Throbber";

function Recommendations({ title, recommendations }) {

	return (
		<>
		<div className="heading-title">
			<span>{ title } - Recommendations</span>
		</div>
		{
			recommendations ? 
			recommendations.recommendations?.length ? recommendations.recommendations?.map((r, index) => (
				<div className="recommendation" key={index}>
					<Link to={`/${r.url.split("/")[3]}/${r.mal_id}`}>
						<div className="img" style={{backgroundImage: `url("${r.image_url}"`}}></div>
					</Link>
					<div className="right">
						<div className="top">
							<Link to={`/${r.url.split("/")[3]}/${r.mal_id}`}>{ r.title }</Link>
						</div>
						<div className="bottom">
							<span>{ r.recommendation_count } people recommended</span>
							<a target="_blank" rel="noreferrer" href={r.recommendation_url}>see more</a>
						</div>
					</div>
				</div>
			)) :
			<h2>None</h2> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	)
}

export default Recommendations;