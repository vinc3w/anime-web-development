function apiUrl(querys, type, page) {
	return `https://api.jikan.moe/v3/search/${type}?q=${querys.q}&page=${page}${querys.type ? "&type=" + querys.type : ""}${querys.status ? "&status=" + querys.status : ""}${querys.rated ? "&rated=" + querys.rated : ""}${querys.genre ? "&genre=" + querys.genre : ""}${querys.score ? "&score=" + querys.score : ""}${querys.genre_exclude ? "&genre_exclude=" + querys.genre_exclude : ""}${querys.order_by ? "&order_by=" + querys.order_by : ""}${querys.sort ? "&sort=" + querys.sort : ""}`
}

export default apiUrl;