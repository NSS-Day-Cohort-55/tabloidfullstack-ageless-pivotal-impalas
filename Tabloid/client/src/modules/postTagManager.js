const url = "/postTag"

export const getPostTagsByPostId = id => {
    return fetch(`${url}/post/${id}`).then(res => res.json())
}

export const CheckIfPtExists = (postId, tagId) => {
    return fetch(`/postTag/post/${postId}/tag/${tagId}`).then(res => res.json())
}

export const addPt = postTag => {
    return fetch(`/api${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postTag)
        
    })
}