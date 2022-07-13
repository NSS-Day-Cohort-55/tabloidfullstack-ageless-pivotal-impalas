const url = "/postTag"

export const getPostTagsByPostId = id => {
    return fetch(`${url}/post/${id}`).then(res => res.json())
}