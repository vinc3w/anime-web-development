import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { xhr, date } from "../../utils/index";
import Throbber from "../../Components/Throbber";
import Error from "../../Components/Error";
import LoadMoreBtn from "../../Components/LoadMoreBtn";

function Review({ r }) {

	return (
		<div className="review">
			<a target="_blank" rel="noreferrer" href={r.reviewer.url}>
				<div className="img" style={{backgroundImage: `url("${r.reviewer.image_url}"`}}></div>
			</a>
			<div className="right">
				<div className="top">
					<a target="_blank" rel="noreferrer" href={r.url}>{ r.reviewer.username }</a>
					<span className="date">{ date.convertISO8601(r.date) }</span>
				</div>
				<div className="content">
					<p>{ r.content }</p>
					<a target="_blank" rel="noreferrer" href={r.url}>See more</a>
				</div>
				<div className="bottom">
					<span>seen { r.reviewer.episodes_seen } eps</span>
					<span className="thumb">
						<i className="material-icons">thumb_up</i>
						{ r.helpful_count }
					</span>
					<button onClick={e => {
						const classList = e.target.parentElement.nextElementSibling.classList;
						classList.toggle("show");
						e.target.innerHTML = classList.contains("show") ? "Hide score" : "Show score";
					}}>Show score</button>
				</div>
				<table>
					<tbody>
						<tr className="table-heading">
							<td>Criteria</td>
							<td>Score</td>
						</tr>
						<tr>
							<td>Animation</td>
							<td>{ r.reviewer.scores.animation || 0 }</td>
						</tr>
						<tr>
							<td>Character</td>
							<td>{ r.reviewer.scores.character || 0 }</td>
						</tr>
						<tr>
							<td>Enjoyment</td>
							<td>{ r.reviewer.scores.enjoyment || 0 }</td>
						</tr>
						<tr>
							<td>Sound</td>
							<td>{ r.reviewer.scores.sound || 0 }</td>
						</tr>
						<tr>
							<td>Story</td>
							<td>{ r.reviewer.scores.story || 0 }</td>
						</tr>
						<tr>
							<td>Overall</td>
							<td>{ r.reviewer.scores.overall || 0 }</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

function Reviews({ title }) {

	const [data, setData] = useState(null);
	const [page, setPage] = useState(1);
	const [connectionError, setConnectionError] = useState(false);
	const [isEndOfPage, setisEndOfPage] = useState(false);
	const [isBtnDisable, setIsBtnDisable] = useState(false);
	const { type, id } = useParams();
	const isUnmounted = useRef(false);

	useEffect(() => {

		const fetchData = async () => {
			isUnmounted.current =  false;
			setIsBtnDisable(true);
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/${type}/${id}/reviews/${page}`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
				if (!parsed.reviews || !parsed.reviews.length) return setisEndOfPage(true);
				if (page === 1) setData(parsed.reviews);
				else setData(data.concat(parsed.reviews));
				setIsBtnDisable(false);
			} catch(err) {
				if (isUnmounted.current) return;
				setConnectionError(true);
				setData(<Error message="No connection" />);
				setisEndOfPage(true);
			}
		}

		fetchData();

		return () => isUnmounted.current = true;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, id, page])
	
	return (
		<>
		<div className="heading-title">
			<span>{ title } - Reviews</span>
		</div>
		{
			data ? connectionError ? data : 
			<>
			{ data?.length ? data?.map((r, index) => <Review r={r} key={index}/>) : <h2>None</h2> }
			<LoadMoreBtn setPage={setPage} isEndOfPage={isEndOfPage} isBtnDisable={isBtnDisable} />
			</> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	);
}

export default Reviews;