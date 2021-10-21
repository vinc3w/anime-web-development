import { date } from "../../utils/index";
import Throbber from "../../Components/Throbber";

function News({ title, news }) {

	return (
		<>
		<div className="heading-title">
			<span>{ title } - News</span>
		</div>
		{
			 news ? news.articles?.length ? news.articles.map((article, index) => (
				<div className="article" key={index}>
					<a target="_blank" rel="noreferrer" href={article.url}>
						<div className="img" style={{backgroundImage: `url("${article.image_url}"`}}></div>
					</a>
					<div className="right">
						<div className="top">
							<a target="_blank" rel="noreferrer" href={article.author_url}>{ article.author_name }</a>
							<span>{ date.convertISO8601(article.date) }</span>
						</div>
						<div className="middle">
							<a target="_blank" rel="noreferrer" href={article.url}><span>{ article.title }</span></a>
							<p>{ article.intro }</p>
						</div>
						<div className="bottom">
							<a target="_blank" rel="noreferrer" href={article.forum_url}><i className="material-icons" title="forum">forum</i></a>
							<i className="material-icons" title="comments">chat</i>
						</div>
					</div>
				</div>
			)) :
			<h2>None</h2> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	)
}

export default News;