import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { xhr } from "../../utils/index";
import Error from "../../Components/Error";
import GridBox from "../../Components/GridBox";
import Throbber from "../../Components/Throbber";
import SchedulePanel from "./SchedulePanel";

function Schedule({ setSidePanelAddOn }) {  // small screen size panel

	const [data, setData] = useState(null);
	const [items, setItems] = useState(null);
	const { day } = useParams();
  const [showSchedulePanel, setShowSchedulePanel] = useState(true);
	const isUnmounted = useRef(false);

  useEffect(() => {

    const handleWindowResize = () => setShowSchedulePanel(
			window.innerWidth <= 720 ? false : true
		);

    handleWindowResize();

    window.onresize = handleWindowResize;

  }, [])

	useEffect(() => {

		const fetchData = async () => {
			isUnmounted.current = false;
			try {
				const response = await xhr(
					"GET",
					`https://api.jikan.moe/v3/schedule`
				);
				const parsed = JSON.parse(response);
				if (isUnmounted.current) return;
	
				setData(parsed);
			} catch(err) {
				if (isUnmounted.current) return;
				setData(<Error message="No connection" />);
			}
		}
	
		fetchData();

		return () => isUnmounted.current = true;

	}, [])

	useEffect(() => {

		if (!data) return;

		if (day) setItems(
			data[day].map((item, index) =>(
				<GridBox key={index} item={item} typeOfItem="anime" />
			))
		);
		else {
			const all = [
				data.monday, data.tuesday, data.wednesday,
				data.thursday, data.friday, data.saturday,
				data.sunday, data.other, data.unknown
			];
			const mapped = [];
			for (let i = 0; i < all.length; i++) all[i].forEach(item => {
				mapped.push(
					<GridBox key={mapped.length + 1} item={item} typeOfItem="anime" />
				);
			})
			setItems(mapped);
		}

	}, [data, day])

	useEffect(() => {

		setSidePanelAddOn(showSchedulePanel && <SchedulePanel day={day} />);

	}, [showSchedulePanel, day])

	return (
		<div className="schedule">
			<div className="heading-title">
				<span>Schedule{ day && " - " + day[0].toUpperCase() + day.slice(1) }</span>
			</div>
			{ !showSchedulePanel && <SchedulePanel day={day} /> }
			<div className="grid-box-container">
				{
					items ||
					<div className="throbber-container">
						<Throbber />
					</div>
				}
			</div>
		</div>
	)
}

export default Schedule;