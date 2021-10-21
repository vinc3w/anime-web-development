function Switch({ setValue, value1, value2 }) {
	return (
		<div className="switch">
			{ value1 }
			<div
				className="track"
				onClick={e => {
					setValue(v => v === value1 ? value2 : value1);
					e.currentTarget.classList.toggle("on")
				}}
			>
				<div className="thumb"></div>
			</div>
			{ value2 }
		</div>
	);
}

export default Switch;