import { useEffect } from "react";
import List from "./List";
import Carousel from "./Carousel";

function Home() {

	useEffect(() => {

		document.title = "ANIME WEB";

	}, [])

	return (
		<div className="home">
			<Carousel />
			<List />
		</div>
	);
}

export default Home;