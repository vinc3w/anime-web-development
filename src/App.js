import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Top, Search, AdvancedSearch, Season, Schedule, Genre, Producer, AnimeManga, CharacterPerson, Nav, SidePanel, Footer } from "./Layout/index";
import "./style/app.css";

function App() { // rmeove page side panel add on on url change

	const [sidePanelAddOn, setSidePanelAddOn] = useState(null);

	return (
		<div className="App">
			<Nav />
			<main>
				<div className="sub">
					<Switch>
						<Route exact path={["/", "/home"]}>
							<Home />
							<SidePanel />
						</Route>
						<Route exact path={["/top/:type", "/top/:type/:subtype"]}>
							<Top setSidePanelAddOn={setSidePanelAddOn} />
							<SidePanel>{ sidePanelAddOn }</SidePanel>
						</Route>
						<Route exact path="/search/:type">
							<Search setSidePanelAddOn={setSidePanelAddOn} />
							<SidePanel>{ sidePanelAddOn }</SidePanel>
						</Route>
						<Route path="/advanced-search">
							<AdvancedSearch/>
							<SidePanel />
						</Route>
						<Route exact path={["/genre/:type", "/genre/:type/:id"]}>
							<Genre/>
							<SidePanel />
						</Route>
						<Route path="/season">
							<Season setSidePanelAddOn={setSidePanelAddOn} />
							<SidePanel>{ sidePanelAddOn }</SidePanel>
						</Route>
						<Route exact path={["/schedule", "/schedule/:day"]}>
							<Schedule setSidePanelAddOn={setSidePanelAddOn} />
							<SidePanel>{ sidePanelAddOn }</SidePanel>
						</Route>
						<Route path="/:type(producer|magazine)/:id">
							<Producer setSidePanelAddOn={setSidePanelAddOn} />
							<SidePanel />
						</Route>
						<Route
							exact
							path={["/:type(anime|manga)/:id", "/:type(anime|manga)/:id/:subtype"]}
							component={AnimeManga}
						/>
						<Route
							exact
							path={["/:type(character|person)/:id", "/:type(character|person)/:id/:subtype"]}
							component={CharacterPerson}
						/>
					</Switch>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;
