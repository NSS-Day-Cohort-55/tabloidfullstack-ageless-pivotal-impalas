const _apiUrl = "/api/post";

export const getAllPosts = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const getAllPostsByUser = (id) => {
    return fetch(`${_apiUrl}/user/${id}`).then(res => res.json())
}
export const getPostById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

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
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    }).then(r => console.log(r));
};