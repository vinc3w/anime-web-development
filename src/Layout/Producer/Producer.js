import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import GridBox from "../../Components/GridBox";
import Skeleton from "../../Components/GridBoxSkeleton";
import SkeletonItems from "../../Components/SkeletonItems";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";

function Producer() {
  
  const { type, id } = useParams();
  const [data, setData] = useState(null);
	const [name, setName] = useState(null);
  const [page, setPage] = useState(1);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
  const isUnmounted = useRef(false);

  const fetchData = async () => {
    isUnmounted.current = false;
    try {
      setIsBtnDisable(true);
      
      const response = await xhr(
        "GET",
        `https://api.jikan.moe/v3/${type}/${id}/${page}`
      );
      const parsed = JSON.parse(response);
			const typeOfItem = type === "producer" ? "anime" : "manga";

      if (isUnmounted.current) return;
  
      if (!parsed[typeOfItem]) return setisEndOfPage(true);
  
      const items = parsed[typeOfItem].map((item, index) =>(
        <GridBox key={data ? data.length + index : index} item={item} typeOfItem={typeOfItem} />
      ));
  
      setData(page > 1 ? data.concat(items) : items);
			setName(parsed.meta.name);
      setIsBtnDisable(false);
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

  }, [type, id])

  useEffect(() => {

    document.title = `${type[0].toUpperCase() + type.slice(1)} - ${name ? " " + name : ""} | ANIME WEB`;

  }, [type, id, name])

  return (
    <div className="top">
      <div className="heading-title">
        <span className="title">Producer - { name }</span>
      </div>
      <div className="grid-box-container">
        { data || SkeletonItems(Skeleton, null, 100) }
      </div>
      <LoadMoreBtn isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} setPage={setPage} />
    </div>
  );
}

export default Producer;