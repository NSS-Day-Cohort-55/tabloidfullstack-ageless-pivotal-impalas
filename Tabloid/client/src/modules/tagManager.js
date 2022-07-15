import { getToken } from "./authManager";
const baseUrl = "/api/tag";

export const getAllTags = () => {
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
				throw new Error("An unknown error occurred while trying to get the tags.");
			}
		});
	});
};

export const getTagById = (id) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${id}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }).then((resp) => {
          if (resp.ok) {
              return resp.json();
          } else {
              throw new Error("An error occurred retrieving tag");
          }
      });
  });
};

export const addTag = (tag) => {
	return getToken().then((token) => {
		return fetch(baseUrl, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tag),
		}).then((resp) => {
			if (resp.ok) {
				return resp.json();
			} else if (resp.status === 401) {
				throw new Error("Unauthorized");
			} else {
				throw new Error("An unknown error occurred while trying to save a new quote.");
			}
		});
	});
};

export const editTag = (tag) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${tag.id}`, {
          method: "PUT",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
      }).then((resp) => {
          if (resp.ok) {
              return resp.json();
          } else if (resp.status === 401) {
              throw new Error("Unauthorized");
          } else {
              throw new Error(
                  "An unknown error occurred while trying to save changes to category."
              );
          }
      });
  });
};


export const deleteTag = (id) => {
  return getToken().then((token) => {
      return fetch(`${baseUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
  });
};

export const getPostByTagId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/PostByTag/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Unknown error getting posts by category");
            }
        });
    });
};
