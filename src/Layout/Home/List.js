import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Skeleton from "../../Components/ListBoxSkeleton";
import SkeletonItems from "../../Components/SkeletonItems";
import ListBox from "../../Components/ListBox";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";

function List() {

	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const location = useLocation();
	const isUnmounted = useRef(false);

	const fetchData = async () => {
		isUnmounted.current = false;
		try {
			setIsBtnDisable(true);
	
			const response = await xhr(
				"GET",
				`https://api.jikan.moe/v3/top/anime/${page}/airing`
			);
			const top = JSON.parse(response).top;

			if (isUnmounted.current) return;
	
			if (!top) return setisEndOfPage(true);
	
			const items = top.map((item, index) => (
				<ListBox key={data ? data.length + index : index} item={item} />
			));
	
			setData(page > 1 ? data.concat(items) : items);
			
			setIsBtnDisable(false);
		} catch(err) {
			if (isUnmounted.current) return;
			setData(<Error message="No connection" />);
			setisEndOfPage(true);
		}
	}
	
	useEffect(() => {

		data && fetchData()

	}, [page])
	
	useEffect(() => {

		page === 1 ? fetchData() : setPage(1);

		return () => isUnmounted.current = true;

	}, [location])

	return (
		<div className="list">
		<div className="heading-title">
				<span>Airing Anime</span>
			</div>
			<div className="content list-box-container">
				{ data || SkeletonItems(Skeleton) }
			</div>
      <LoadMoreBtn isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} setPage={setPage} />
		</div>
	);
}

export default List;