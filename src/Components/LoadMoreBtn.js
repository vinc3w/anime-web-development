import Throbber from "./Throbber";

function LoadMoreBtn({ isEndOfPage, isBtnDisable, setPage }) {

	const className = () => {
		if (isEndOfPage) return "load-more end";
		if (isBtnDisable) return "load-more disable";
		return "load-more";
	}

	const handleBtnClick = () => {
		if (isEndOfPage) return;
		if (isBtnDisable) return;
		setPage(page => page + 1);
	}

	const text = () => {
		if (isEndOfPage) return "End of Page";
		if (isBtnDisable) return <Throbber />;
		return "Load More";
	}

	return (
		<button
			className={className()}
			onClick={handleBtnClick}
		>
			{ text() }
		</button>
	);
}

export default LoadMoreBtn;