import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { xhr, date } from "../../utils/index";
import Switch from "../../Components/Switch";
import LoadMoreBtn from "../../Components/LoadMoreBtn";
import Throbber from "../../Components/Throbber";
import Error from "../../Components/Error";

function Item({ e, title, lang }) {
	return (
		<div className="episode">
			<div className="id">{ e.episode_id }</div>
			<div className="left">
				{
					e.video_url ? 
					<Link to={e.video_url} className="title" title={`Watch ${title} episode ${e.episode_id}`}>
						<i className="material-icons">tv</i>
						<span>
							{ lang === "eng" ? <>{ e.title }&nbsp;</> : <>{ e.title_japanese }&nbsp;</> }
							{ e.recap && <>- recap&nbsp;</> }
							{ e.filler && "[filler]" }
						</span>
					</Link> : 
					<div className="title" title="No video available :(" >
						<i className="material-icons">tv</i>
						<span>
							{ lang === "eng" ? <>{ e.title }&nbsp;</> : <>{ e.title_japanese }&nbsp;</> }
							{ e.recap && <>- recap&nbsp;</> }
							{ e.filler && "[filler]" }
						</span>
					</div>
				}
				<span>{ date.convertISO8601(e.aired) }</span>
			</div>
		</div>
	);
}

function Episodes({ title }) {

	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [lang, setLang] = useState("eng");
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const [connectionError, setConnectionError] = useState(false);
	const { id } = useParams();
	const isUnmounted= useRef(false);

	useEffect(() => {

		const fetchData = async () => {
			setIsBtnDisable(true);
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/anime/${id}/episodes/${page}`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
				if (!parsed.episodes.length ) return setisEndOfPage(true);
				setData(page === 1 ? parsed.episodes : data.concat(parsed.episodes));
				setIsBtnDisable(false);
				if (page === parsed.episodes_last_page) setisEndOfPage(true);
			} catch(err) {
				if (isUnmounted.current) return;
				setConnectionError(true);
				setData(<Error message="No Connection" />);
				setisEndOfPage(true);
			}
		}

		fetchData();

		return () => isUnmounted.current = true;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, id])

	return (
		<>
		<div className="heading-title">
			<span>{ title } - Episodes</span>
			<Switch setValue={setLang} value1="eng" value2="jp" />
		</div>
		{
			data ?  connectionError ? data : <>
			{ data.length ? data.map((e, index) => <Item key={index} e={e} title={title} lang={lang} />) : <h2>None</h2> }
			<LoadMoreBtn setPage={setPage} isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} />
			</> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	);
}

export default Episodes;