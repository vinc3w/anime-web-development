import { useLocation } from "react-router-dom";

function useQuerys() {
  const querys = new URLSearchParams(useLocation().search);
	const obj = {};
	for (let [key, value] of querys) {
		obj[key] = value;
	}
	return obj;
}

export default useQuerys;