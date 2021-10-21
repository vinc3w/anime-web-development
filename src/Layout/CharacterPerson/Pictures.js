import { Link } from "react-router-dom";

function Pictures({ type, data, pictures }) {

	return (
		<>
		<Link className="back" to={`/${type}/${data.mal_id}`}>Back</Link>
		<div className="heading">
			<span>{ data.name } - Pictures</span>
		</div>
		{
			<div className="images">
				{
					pictures.pictures.length ? pictures.pictures.map((img, index) => (
						<img key={index} src={img.image_url} alt="" />
					)) : <h2>None</h2>
				}
			</div>
		}
		</>
	);
}

export default Pictures;