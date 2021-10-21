import SelectMenu from "../../Components/SelectMenu";

function Selects({ type, setType, setSubtype, setStatus, setRated, setOrder, setSort }) {
	return (
		<div className="left">
			<SelectMenu
				options={[
					{ title: "Type" },
					{ title: "Anime", value: "anime" },
					{ title: "Manga", value: "manga" }
				]}
				setSelected={setType}
			/>
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
				setSelected={setSubtype}
			/>
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
				setSelected={setStatus}
			/>
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
				setSelected={setRated}
			/>
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
				setSelected={setOrder}
			/>
			<SelectMenu
				options={[
					{ title: "Sort" },
					{ title: "Ascending", value: "asc" },
					{ title: "Descending", value: "desc" }
				]}
				setSelected={setSort}
			/>
		</div>
	);
}

export default Selects;