import { genres } from "../../utils/index";

function CheckBox({ genre, setGenres }) {

	const checkThis = e => {
		e.currentTarget.classList.toggle("checked");
		setGenres(g => {
			const index = g.indexOf(genre.value);
			if (index >= 0) g.splice(index, 1);
			else g.push(genre.value);
			return g;
		})
	}

	return (
		<div className="checkbox" onClick={checkThis}>
			<div className="box">
				<div className="checkmark"></div>
			</div>
			<span>{ genre.title }</span>
		</div>
	);
}

function CheckBoxes({ type, setGenres, setExcludeGenres }) {

	const includeExcludeGenres = e => {
		e.currentTarget.classList.toggle("on");
		setExcludeGenres(exclude => exclude === "1" ? "2" : "1");
	}
	
	return ( 
		<div className="right">
			<div className="switch">
				<span>Include</span>
				<div className="track" onClick={includeExcludeGenres}>
					<div className="thumb"></div>
				</div>
				<span>Exclude</span>
			</div>
			<div className="checkboxes">
				{
					genres[type].map((genre, index) => (
						<CheckBox key={index} genre={genre} setGenres={setGenres} />
					))
				}
			</div>
		</div>
	);
}

export default CheckBoxes;