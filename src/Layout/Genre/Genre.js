import { useState, useEffect, useRef } from "react";
import { genres, xhr } from "../../utils/index";
import { useParams, Link } from "react-router-dom";
import GridBox from "../../Components/GridBox";
import SkeletonItems from "../../Components/SkeletonItems";
import Skeleton from "../../Components/GridBoxSkeleton";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import Error from "../../Components/Error"

function Genre() {

	const { type, id } = useParams();
	const [genre, setGenre] = useState(null);
	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const [totalItems, setTotalItems] = useState(null);
	const isUnmounted = useRef(false);

	const fetchData = async () => {
		isUnmounted.current = false;
		try {
			setIsBtnDisable(true);

			const response = await xhr(
				"GET",
				`https://api.jikan.moe/v3/genre/${type}/${id}/${page}`
			);
			const parsed = JSON.parse(response);

			if (isUnmounted.current) return;
	
			const items = parsed[parsed.mal_url.type].map((item, index) => (
				<GridBox key={data ? data.length + index : index} item={item} typeOfItem={parsed.mal_url.type} />
			));
	
			setData(page > 1 ? data.concat(items) : items);
			setGenre(parsed.mal_url.name);
			setTotalItems(parsed.item_count);
			setIsBtnDisable(false);
		} catch(err) {
			if (isUnmounted.current) return;
			setData(<Error message="No connection" />);
			setisEndOfPage(true);
		}
	}

	useEffect(() => {

		setisEndOfPage(!!(data && data.length >= totalItems))

	}, [data, totalItems])
	
	useEffect(() => {

		if (!data) return;
		if (page === 1) setData(null);
		fetchData();

	}, [page])
	
	useEffect(() => {

		if (!id) return;

		if (page === 1) {
			setData(null);
			fetchData();
		}
		else setPage(1);

		return () => isUnmounted.current = true;

	}, [type, id])

	useEffect(() => {

		document.title = `Genre ${genre ? genre + " " : ""}| ANIME WEB`;

	}, [genre])

	return (
		<div className="genre">
      <div className="heading-title">
				<span>Genre</span>
			</div>
			<ul className="links">
				{
					genres[type].map((genre, index) => (
						<li key={index} className={id === genre.value ? "on-here" : ""}>
							<Link to={`/genre/${type}/${genre.value}`}>{ genre.title }</Link>
						</li>
					))
				}
			</ul>
			{
				id &&
				<>
				<div className="heading-title">
					<span>{ genre } ({ (totalItems) } items found)</span>
				</div>
				<div className="grid-box-container">
					{ data || SkeletonItems(Skeleton, 100) }
				</div>
      	<LoadMoreBtn isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} setPage={setPage} />
				</>
			}
		</div>
	);
}

export default Genre;