import { useState, useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { xhr } from "../../utils/index";
import GridBox from "../../Components/GridBox";
import Skeleton from "../../Components/GridBoxSkeleton";
import SkeletonItems from "../../Components/SkeletonItems";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import { useQuerys } from "../../Hooks/index";
import apiUrl from "./apiUrl";
import Error from "../../Components/Error";
import FilterPanel from "./FilterPanel";

function Search({ setSidePanelAddOn }) { // useeffect depencies

	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
	const { type } = useParams();
	const querys = useQuerys();
	const url = apiUrl(querys, type, page);
	const isUnmounted = useRef(false);
	const location = useLocation();

	const fetchData = async () => {
		isUnmounted.current = false;
		try {
			setIsBtnDisable(true);
			
			const response = await xhr("GET", url);
			const parsed = JSON.parse(response);

			if (isUnmounted.current) return;
	
			if (!parsed.results || parsed.results.length === 0) {
				setData(<Error message="No results Found" />);
				return setisEndOfPage(true);
			}
	
			const items = parsed.results.map((item, index) =>(
				<GridBox key={data ? data.length + index : index} item={item} typeOfItem={type} />
			));
	
			setData(page > 1 ? data.concat(items) : items);
			setIsBtnDisable(false);
	
			if (page === parsed.last_page) setisEndOfPage(true);
		} catch(err) {
			if (isUnmounted.current) return;
			setData(<Error message="No connection" />);
			setisEndOfPage(true);
		}
	}
	
	useEffect(() => {

		if (!data) return;
		if (page === 1) setData(null);
		fetchData();

	}, [page])			
	
	useEffect(() => {

		if (page === 1) {
			setData(null);
			fetchData();
		}
		else setPage(1);

		return () => isUnmounted.current = true;

	}, [location])

	useEffect(() => {

		setSidePanelAddOn(
			(type === "anime" || type === "manga") && showFilterPanel && <FilterPanel type={type} />
		)

	}, [type, showFilterPanel])

  useEffect(() => {

    const handleWindowResize = () => setShowFilterPanel(
			window.innerWidth <= 720 ? false : true
		);

    handleWindowResize();

    window.onresize = handleWindowResize;

  }, [])
	
	return (
		<>
		<div className="search">
      <div className="heading-title">
				<span>{ querys.q }</span>
			</div>
			{ !showFilterPanel && <FilterPanel type={type} /> }
			<div className="content grid-box-container">
				{ data || SkeletonItems(Skeleton) }
			</div>
      <LoadMoreBtn isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} setPage={setPage} />
		</div>
		</>
	);
}

export default Search;