import urmaruChanSad from "../assets/umaru-chan-sad.png";

function Error({ message }) {
	return (
		<div className="error">
			<img src={urmaruChanSad} alt="" />
			<span>{ message }</span>
		</div>
	);
}

export default Error;