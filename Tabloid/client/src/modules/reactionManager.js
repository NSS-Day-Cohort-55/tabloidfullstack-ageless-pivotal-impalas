import { getToken } from "./authManager";
const baseUrl = "/api/reaction";

export const getAllReactions = () => {
	return getToken().then((token) => {
		return fetch(baseUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((resp) => {
			if (resp.ok) {
				return resp.json();
			} else {
				throw new Error("An unknown error occurred while trying to get the reactions.");
			}
		});
	});
};

export const addReaction = (reaction) => {
	return getToken().then((token) => {
		return fetch(baseUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reaction),
		}).then((resp) => {
			if (resp.ok) {
				return ;
			} else if (resp.status === 401) {
				throw new Error("Unauthorized");
			} else {
				throw new Error("An unknown error occurred while trying to save a new quote.");
			}
		});
	});
};