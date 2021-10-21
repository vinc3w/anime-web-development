import { useRef } from "react";
import SearchBar from "../../Components/SearchBar";
import logo from "../../assets/logo.png";
import SelectLinkMenu from "../../Components/SelectLinkMenu";
import { Link } from "react-router-dom";

function Nav() {

	const navLinks = useRef(null);

	const toggleNav = e => {
		navLinks.current.classList.toggle("toggle");
	}

	return (
		<>
		<nav className="nav-bar">
			<div className="sub">
				<div className="left">
					<img className="logo" src={logo} alt="" />
					<SearchBar />
				</div>
				<div className="right">
					<div className="hamburger" onClick={toggleNav}>
						<li className="line"></li>
						<li className="line"></li>
						<li className="line"></li>
					</div>
					<ul className="nav-links">
						<li><Link to="/">Home</Link></li>
						<li>
							<SelectLinkMenu
								title="Top"
								values={[
									{ title: "Anime", url: "/top/anime" },
									{ title: "Manga", url: "/top/manga" }
								]}
							/>
						</li>
						<li>
							<SelectLinkMenu
								title="Genre"
								values={[
									{ title: "Anime", url: "/genre/anime" },
									{ title: "Manga", url: "/genre/manga" }
								]}
							/></li>
						<li><Link to="/advanced-search">Advanced Search</Link></li>
						<li><Link to="/season">Season</Link></li>
						<li><Link to="/schedule">Schedule</Link></li>
					</ul>
				</div>
			</div>
		</nav>
		<ul className="nav-links-small" ref={navLinks}>
			<li><Link to="/">Home</Link></li>
			<li>
				<span>Top</span>
				<ul>
					<li><Link to="/top/anime">Anime</Link></li>
					<li><Link to="/top/manga">Manga</Link></li>
				</ul>
			</li>
			<li>
				<span>Genre</span>
				<ul>
					<li><Link to="/genre/anime">Anime</Link></li>
					<li><Link to="/genre/manga">Manga</Link></li>
				</ul>
			</li>
			<li><Link to="/advanced-search">Advanced Search</Link></li>
			<li><Link to="/season">Season</Link></li>
			<li><Link to="/schedule">Schedule</Link></li>
		</ul>
		</>
	);
}

export default Nav;