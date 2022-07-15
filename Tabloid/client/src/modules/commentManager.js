const url = '/api/comment'

export const getCommentsByPost = postId => {
    return fetch(`${url}/post/${postId}`).then(res => res.json())
}