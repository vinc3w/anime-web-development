import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Archive, Later } from "./Pages";

function Season({ setSidePanelAddOn }) {

  const [showSeasonPanel, setShowSeasonPanel] = useState(true);

  useEffect(() => {

    const handleWindowResize = () => setShowSeasonPanel(
			window.innerWidth <= 720 ? false : true
		);

    handleWindowResize();

    window.onresize = handleWindowResize;

  }, [])

	return (
		<div className="season">
			<Switch>
				<Route exact path={["/season", "/season/:year/:season"]}>
					<Home setSidePanelAddOn={setSidePanelAddOn} showSeasonPanel={showSeasonPanel} />
				</Route>
				<Route exact path="/season/archive">
					<Archive setSidePanelAddOn={setSidePanelAddOn} showSeasonPanel={showSeasonPanel} />
				</Route>
				<Route exact path="/season/later">
					<Later setSidePanelAddOn={setSidePanelAddOn} showSeasonPanel={showSeasonPanel} />
				</Route>
			</Switch>
		</div>
	);
}

export default Season;