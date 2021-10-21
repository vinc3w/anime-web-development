import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "../../Components/Switch";
import Throbber from "../../Components/Throbber";

function Videos({ title, videos }) {
	
	const [dataType, seDataType] = useState("episodes");

	return (
		<>
		<div className="heading-title">
			<span>{ title } - Videos</span>
			<Switch setValue={seDataType} value1="episodes" value2="promo" />
		</div>
		{
			<div className="videos">
				{
					videos ? videos[dataType]?.length ? videos[dataType].map((video, index) => (
						<Link
							to={video.url}
							target="_blank"
							rel="noreferrer"
							title={dataType === "episodes" ? `${video.episode} - ${video.title}` : video.title}
							className="video"
							key={index}
						>
							<div className="img" style={{backgroundImage: `url("${video.image_url}")`}}></div>
							<div className="title">
								<span>{ dataType === "episodes" ? `${video.episode} - ${video.title}` : video.title}</span>
							</div>
						</Link>
					)).reverse() :
					<h2>None</h2> :
					<div className="throbber-container">
						<Throbber />
					</div>
				}
			</div>
		}
		</>
	);
}

export default Videos;