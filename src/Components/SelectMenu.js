import { useState, useEffect, useRef } from "react";

function SelectMenu({ options, selected, setSelected }) {

	const ul = useRef(null);
	const [selectedValue, setSelectedValue] = useState(selected);
	const [optionList, setOptionList] = useState(null);

	const showOptions = () => {
		ul.current.style.display = "block"
		setTimeout(() => ul.current.style.opacity = "1");

		document.body.onclick = () => {
			if (!ul?.current) return;
			ul.current.style.opacity = "";
			setTimeout(() => ul?.current ? ul.current.style.display = "" : null, 100);
			document.body.onclick = null;
		}
	}

	const closeOptions = () => {
		ul.current.style.opacity = "";
		setTimeout(() => ul?.current ? ul.current.style.display = "" : null, 100);
	}

	const handleSelectClicks = e => {
		const isOpen = ul.current.style.display;
		if (isOpen) closeOptions();
		else showOptions();
	}
	
	useEffect(() => {
		
		const changeOptionList = () => setOptionList(options.filter(i => i.value).map((option, index) => {
				
			const selectThis = e => {
				setSelected(option.value);
				setSelectedValue(option);
				closeOptions();
			}
	
			return (
				<li key={index} onClick={selectThis} className={option.value === selectedValue?.value ? "selected" : ""}>
					<span>
						{ option.title }
					</span>
					<i className="material-icons">done</i>
				</li>
			)
		}))
		changeOptionList();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue])

	return (
		<div className="select-menu" onClick={e => e.stopPropagation()}>
			<div className="value" onClick={handleSelectClicks}>
				<p>{ selectedValue?.title || options.find(i => i.value === selectedValue)?.title || options[0].title }</p>
				<i className="material-icons">expand_more</i>
			</div>
			<ul className="options" ref={ul}>{ optionList }</ul>
		</div>
	);
}

export default SelectMenu;