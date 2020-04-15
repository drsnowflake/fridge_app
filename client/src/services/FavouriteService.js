const baseURL = 'http://localhost:3000/api/favourites/';

export default {
	getFavourites() {
		return fetch(baseURL).then((res) => res.json());
	},
	addFavourite(payload) {
		return fetch(baseURL, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.json());
	},
	removeFavourite(id) {
		return fetch(baseURL + id, {
			method: 'DELETE',
		}).then((res) => res.json());
	},
};
