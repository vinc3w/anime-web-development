const date = {
	convertISO8601: d => {
		const D = new Date(d);
		return `${D.getDate()}/${D.getMonth()}/${D.getFullYear()}`;
	}
};

export default date;