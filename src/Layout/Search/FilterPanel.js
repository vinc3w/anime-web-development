import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuerys } from "../../Hooks/index";
import SelectMenu from "../../Components/SelectMenu";

function FilterPanel({ type }) {

	const querys = useQuerys();
	const [subtype, setSubtype] = useState(querys.type);
	const [status, setStatus] = useState(querys.status);
	const [rated, setRated] = useState(querys.rated);
	const [order, setOrder] = useState(querys.order);
	const [sort, setSort] = useState(querys.sort);
	const history = useHistory();

	const filterItems = e => {
		if (!subtype && status && rated && order && order && sort) return;
		history.push({
			search: `q=${querys.q}${subtype ? "&type=" + subtype: ""}${status ? "&status=" + status: ""}${rated ? "&rated=" + rated : ""}${order ? "&order=" + order: ""}${sort ? "&sort=" + sort: ""}`
		})
	}

	const showFilterPanel = e => {
		e.currentTarget.parentElement.classList.toggle("open");
	}

	return (
		<ul className="search-filter-panel">
			<li className="title" onClick={showFilterPanel}>Filter</li>
			<li>
				<SelectMenu
					options={
						type === "anime" ?
						[
							{ title: "Subtype" },
							{ title: "Tv", value: "tv" },
							{ title: "Ova", value: "ova" },
							{ title: "Movie", value: "movie" },
							{ title: "Special", value: "special" },
							{ title: "Ona", value: "ona" },
							{ title: "Music", value: "music" }
						] : 
						[
							{ title: "Subtype" },
							{ title: "Manga", value: "manga" },
							{ title: "Novel", value: "novel" },
							{ title: "Oneshot", value: "oneshot" },
							{ title: "Doujin", value: "doujin" },
							{ title: "Manhwa", value: "manhwa" },
							{ title: "Manhua", value: "manhua" }
						]
					}
					selected={subtype}
					setSelected={setSubtype}
				/>
			</li>
			<li>
				<SelectMenu
					options={
						type === "anime" ?
						[
							{ title: "Status" },
							{ title: "Airing", value: "airing" },
							{ title: "Completed", value: "completed" },
							{ title: "Upcoming", value: "upcoming" }
						] : 
						[
							{ title: "Status" },
							{ title: "Publishing", value: "publishing" },
							{ title: "Completed", value: "completed" },
							{ title: "Upcoming", value: "upcoming" }
						]
					}
					selected={status}
					setSelected={setStatus}
				/>
			</li>
			<li>
				<SelectMenu
					options={[
						{ title: "Rated" },
						{ title: "G", value: "g" },
						{ title: "Pg", value: "pg" },
						{ title: "Pg13", value: "pg13" },
						{ title: "R17", value: "r17" },
						{ title: "R", value: "r" },
						{ title: "Rx", value: "rx" }
					]}
					selected={rated}
					setSelected={setRated}
				/>
			</li>
			<li>
				<SelectMenu
					options={
						[
							{ title: "Order" },
							{ title: "Title", value: "title" },
							{ title: "Start Date", value: "start_date" },
							{ title: "End Date", value: "end_date" },
							{ title: "Score", value: "start_date" },
							{ title: "Type", value: "start_date" }
						]
						.concat(
							type === "anime" ? 
							[
								{ title: "Episodes", value: "episodes" },
								{ title: "Rating", value: "rating" }
							] :
							[
								{ title: "Chapters", value: "chapters" },
								{ title: "Volumes", value: "volumes" }
							]
						)
					}
					selected={order}
					setSelected={setOrder}
				/>
			</li>
			<li>
				<SelectMenu
					options={[
						{ title: "Sort" },
						{ title: "Ascending", value: "asc" },
						{ title: "Descending", value: "desc" }
					]}
					selected={sort}
					setSelected={setSort}
				/>
			</li>
			<li>
				<button onClick={filterItems}>Filter</button>
			</li>
		</ul>
	);
}

export default FilterPanel;