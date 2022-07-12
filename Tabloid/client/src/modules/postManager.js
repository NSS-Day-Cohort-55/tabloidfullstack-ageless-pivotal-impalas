const _apiUrl = "/api/post";

export const getAllPosts = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}

export const getAllPostsByUser = () => {
    return fetch(`${_apiUrl}`).then(res => res.json())
}