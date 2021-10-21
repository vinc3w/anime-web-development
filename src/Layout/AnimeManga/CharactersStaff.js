import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "../../Components/Switch";
import Throbber from "../../Components/Throbber";

function Characters({ data, show }) {
	if (show === "characters") return data?.length ? data?.map((character, cIndex) => (
		<div className="character" key={cIndex}>
			<div className="item">
				<Link to={`/character/${character.mal_id}`}>
					<div className="img" style={{backgroundImage: `url("${character.image_url}")`}}></div>
				</Link>
				<div>
					<Link to={`/character/${character.mal_id}`}>
						<span>{ character.name }</span>
					</Link>
					<span>{ character.role }</span>
				</div>
			</div>
			{
				character.voice_actors &&
				<div className="vas">
					{
						character.voice_actors.map((va, vaIndex) => (
							<div className="va" key={vaIndex}>
								<Link to={`/person/${va.mal_id}`}>
									<div className="img" style={{backgroundImage: `url("${va.image_url}")`}}></div>
								</Link>
								<div>
									<Link to={`/person/${va.mal_id}`}>
										<span>{ va.name }</span>
									</Link>
									<span>{ va.language }</span>
								</div>
							</div>
						))
					}
				</div>
			}
		</div>
	)) : <h2>None</h2>
	else return null;
}

function Staff({ data, show }) {
	if ( show === "staff") return  data?.length ? data?.map((staff, index) => (
		<div className="staff" key={index}>
			<Link to={`/person/${staff.mal_id}`}>
					<div className="img" style={{backgroundImage: `url("${staff.image_url}")`}}></div>
			</Link>
			<div>
				<Link to={`/person/${staff.mal_id}`}>
					<span>{ staff.name }</span>
				</Link>
				<span>{ staff.positions.join(", ") }</span>
			</div>
		</div>
	)) : <h2>None</h2>
	else return null;
}

function CharactersStaff({ charactersStaff, title, type }) {
	
	const [show, setShow] = useState("characters");

	return (
		<>
		<div className="heading-title">
			<span>{ title } - { show === "characters" ? "Characters" : "Staff" }</span>
			{ type === "anime" && <Switch setValue={setShow} value1="characters" value2="staff" /> }
		</div>
		{
			charactersStaff ? 
			<>
			<Characters data={charactersStaff.characters} show={show} />
			{ type === "anime" && <Staff data={charactersStaff.staff} show={show} /> }
			</> : 
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	)
}

export default CharactersStaff;