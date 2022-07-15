import { getToken } from "./authManager";
const _apiUrl = "/api/post";


export const getAllPosts = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const getAllPostsByUser = (id) => {
    return fetch(`${_apiUrl}/user/${id}`).then(res => res.json())
}

export const getAllPostsByCategory = (id) => {
    return fetch(`${_apiUrl}/category/${id}`).then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}


export const addReactionToPost = (postReaction) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/postReaction`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postReaction)
        })
    })
}

export const getReactionPostList = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/postReaction`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Unknow error getting postReactionList")
            }
        });
    });
};

export const addPost = (post) => {
    return fetch(`${_apiUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }).then(response => response.json())
}

export const editPost = (post) => {
    delete post.userProfile
    return fetch(`${_apiUrl}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
};

export const deletePost = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE"
    })
}