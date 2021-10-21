import { useRef } from "react";
import { Link } from "react-router-dom";
 
function SelectLinkMenu({ values, title }) {

    const options = useRef(null);

    const showOptions = () => {
        options.current.style.display = "block"
        setTimeout(() => options.current.style.opacity = "1");
    }

    const closeOptions = () => {
        options.current.style.opacity = "";
        setTimeout(() => options.current.style.display = "", 100);
    }

    const handleSelectMouseEnter = e => {
        showOptions();
        e.target.parentElement.onmouseleave = closeOptions;
    }

    return (
        <div className="select-link-menu">
            <p onMouseEnter={handleSelectMouseEnter}>{ title }</p>
            <ul className="options" ref={options}>
                {
                values.map((link, index) => (
                    <li key={index}>
                        <Link to={link.url}>{ link.title }</Link>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}

export default SelectLinkMenu;