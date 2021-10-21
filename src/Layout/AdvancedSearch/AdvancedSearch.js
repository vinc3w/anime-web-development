import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Selects from "./Selects";
import CheckBoxes from "./CheckBoxes";

function AdvancedSearch() {

	const [type, setType] = useState("anime");
	const [subtype, setSubtype] = useState(null);
	const [status, setStatus] = useState(null);
	const [rated, setRated] = useState(null);
	const [order, SetOrder] = useState(null);
	const [sort, setSort] = useState(null);
	const [genres, setGenres] = useState([]);
	const [excludeGenres, setExcludeGenres] = useState("1");
	const input = useRef(null);
	const history = useHistory();
	
	const handleFormSubmit = e => {
		e.preventDefault();
		const inputVal = input.current.value.trim();
		if (inputVal.length < 3) return;
		history.push({
			pathname: `/search/${type}`,
			search: `q=${inputVal}${subtype ? "&subtype=" + subtype : ""}${status ? "&status=" + status : ""}${rated ? "&rated=" + rated : ""}${order ? "&order=" + order : ""}${sort ? "&sort=" + sort : ""}${genres.length ? "&genre=" + genres : ""}${genres.length ? "&exclude-genres=" + excludeGenres : ""}`
		})
	}

	return (
		<>
		<di className="advanced-search">
			<div className="heading-title">
				<span>Advanced Search</span>
			</div>
			<form className="content" onSubmit={handleFormSubmit}>
				<div className="advanced-search-bar">
					<input type="text" placeholder="Search..." ref={input} />
				</div>
				<Selects
					type={type}
					setType={setType}
					setSubtype={setSubtype}
					setStatus={setStatus}
					setRated={setRated}
					setOrder={SetOrder}
					setSort={setSort}
				/>
				<CheckBoxes
					type={type}
					setGenres={setGenres}
					setExcludeGenres={setExcludeGenres}
				/>
				<button type="submit">
					<i className="material-icons">search</i>
				</button>
			</form>
		</di>
		</>
	);
}

export default AdvancedSearch;