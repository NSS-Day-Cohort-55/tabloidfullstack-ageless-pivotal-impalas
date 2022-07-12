import { getToken } from "./authManager";

const _apiUrl = "/api/userprofile";

// https://localhost:5001/api/UserProfile/
export const getAllUserProfiles = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json());
    })
};