import { useState, useEffect, useRef } from "react";
import CarouselItem from "./CarouselItem";
import { xhr } from "../../utils/index";
import SkeletonItems from "../../Components/SkeletonItems";
import Error from "../../Components/Error";

function Carousel() {

  const [data, setData] = useState();
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const carouselItems = useRef(null);
  const isUnmounted = useRef(false);

  useEffect(() => {

    const fetchData = async () => {
      isUnmounted.current = false;
      try {
        const response = await xhr(
          "GET",
          "https://api.jikan.moe/v3/top/anime/1/bypopularity"
        );
        const top = JSON.parse(response).top;
        if (!top) return;
        if (isUnmounted.current) return;
        setData(top.map((item, index) => <CarouselItem key={index} item={item} />));
      } catch(err) {
        if (isUnmounted.current) return;
        setData(<Error message="No connection" />);
      }
    }

    fetchData();

    const onScrollHandler = () => {
      const parentWidth = carouselItems.current.parentElement.offsetWidth;
      const scrollLeft = carouselItems.current.scrollLeft;
      switch(scrollLeft) {
        case 0:
          prevBtn.current.style.display = "none";
          nextBtn.current.style.display = "";
          break;
        case carouselItems.current.scrollWidth - parentWidth:
          prevBtn.current.style.display = "";
          nextBtn.current.style.display = "none";
          break;
        default:
          prevBtn.current.style.display = "";
          nextBtn.current.style.display = "";
          break;
      }
    }

    onScrollHandler();

    carouselItems.current.onscroll = onScrollHandler;

    return () => isUnmounted.current = true;

  }, [])

  const goPrev = e => {
    const parentWidth = e.currentTarget.parentElement.offsetWidth;
    const currentScrollLeft = carouselItems.current.scrollLeft - (parentWidth * 50 / 100);
    carouselItems.current.scrollTo(currentScrollLeft, 0);
  }

  const goNext = e => {
    const parentWidth = e.currentTarget.parentElement.offsetWidth;
    const currentScrollLeft = carouselItems.current.scrollLeft + (parentWidth * 50 / 100);
    carouselItems.current.scrollTo(currentScrollLeft, 0);
  }

  return (
    <div className="carousel">
      <div className="heading-title">
				<span>Popular Anime</span>
      </div>
      <div className="content">
        <button className="prev" onClick={goPrev} ref={prevBtn}>
          <i className="material-icons">expand_more</i>
        </button>
        <button className="next" onClick={goNext} ref={nextBtn}>
          <i className="material-icons">expand_more</i>
        </button>
        <div className="carousel-items" ref={carouselItems}>
          { data || SkeletonItems(() => <div className="item-skeleton skeleton-loading" />) }
        </div>
      </div>
    </div>
  );
}

export default Carousel;