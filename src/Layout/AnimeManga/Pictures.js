import { useState } from "react";
import Switch from "../../Components/Switch";
import Throbber from "../../Components/Throbber";

function Pictures({ title, pictures }) {
	
	const [size, setSize] = useState("large");

	return (
		<>
		<div className="heading-title">
			<span>{ title } - Pictures</span>
			<Switch setValue={setSize} value1="large" value2="small" />
		</div>
		{
			pictures ?
			<div className={size}>
				{
					pictures.pictures?.length ? pictures.pictures?.map((img, index) => (
						<img key={index} src={img[size]} alt="" />
					)) : <h2>None</h2>
				}
			</div> :
			<div className="throbber-container">
				<Throbber />
			</div>
		}
		</>
	)
}

export default Pictures;