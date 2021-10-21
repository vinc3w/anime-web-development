import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import SelectMenu from "./SelectMenu";

function SearchBar() {

	const [type, setType] = useState("anime");
	const history = useHistory();
	const input = useRef(null);

	const handleFormSubmit = e => {
		e.preventDefault();
		const value = input.current.value.trim();
		if (value.length < 3) return;
		history.push(`/search/${type}?q=${value}`);
	}

	return (
		<form className="search-bar" onSubmit={handleFormSubmit}>
			<input type="text" placeholder="Type to search" ref={input} />
			<SelectMenu
				options={[
					{ title: "Anime", value: "anime" },
					{ title: "Manga", value: "manga" },
					{ title: "Character", value: "character" },
					{ title: "Person", value: "person" }
				]}
				selected={type}
				setSelected={setType}
			/>
			<button type="submit">
				<i className="material-icons">search</i>
			</button>
		</form>
	);
}

export default SearchBar;