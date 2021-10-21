import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import TopPanel from "./TopPanel";
import GridBox from "../../Components/GridBox";
import Skeleton from "../../Components/GridBoxSkeleton";
import SkeletonItems from "../../Components/SkeletonItems";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";

function Top({ setSidePanelAddOn }) {
  
  const { type, subtype } = useParams();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
  const [showTopPanel, setShowTopPanel] = useState(true);
  const isUnmounted = useRef(false);

  useEffect(() => {

    const handleWindowResize = () => setShowTopPanel(
			window.innerWidth <= 720 ? false : true
		);

    handleWindowResize();

    window.onresize = handleWindowResize;

  }, [])

  const fetchData = async () => {
    isUnmounted.current = false;
    try {
      setIsBtnDisable(true);
      
      const response = await xhr(
        "GET",
        `https://api.jikan.moe/v3/top/${type}/${page}${subtype ? "/" + subtype : ""}`
      );
      const top = JSON.parse(response).top;

      if (isUnmounted.current) return;
  
      if (!top) return setisEndOfPage(true);
  
      const items = top.map((item, index) =>(
        <GridBox key={data ? data.length + index : index} item={item} typeOfItem={type} />
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
    
    if (!data) return;
    if (page === 1) setData(null);
    fetchData();

  }, [page])
	
	useEffect(() => {

    document.title = `Top${subtype ? " " + subtype[0].toUpperCase() + subtype.slice(1) : ""}${type === "anime" ? " Anime" : " Manga"} | ANIME WEB`;

    if (page === 1) {
      setData(null);
      fetchData();
    }
    else setPage(1);

    return () => isUnmounted.current = true;

  }, [type, subtype])

  useEffect(() => {

    setSidePanelAddOn(showTopPanel && <TopPanel type={type} subtype={subtype} />)

  }, [showTopPanel, type, subtype])

  return (
    <div className="top">
      <div className="heading-title">
        <span className="title">Top{subtype ? " " + subtype[0].toUpperCase() + subtype.slice(1) : ""}{type === "anime" ? " Anime" : " Manga"}</span>
      </div>
      { !showTopPanel && <TopPanel type={type} subtype={subtype} /> }
      <div className="grid-box-container">
        { data || SkeletonItems(Skeleton) }
      </div>
      <LoadMoreBtn isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} setPage={setPage} />
    </div>
  );
}

export default Top;