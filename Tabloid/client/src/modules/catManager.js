const api = "/api/category"

export const getAllCategories = () => {
    return fetch(`${api}`).then(res => res.json())
}

export const addCategory = name => {
    return fetch(`${api}?name=${name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteCategory = id => {
    return fetch(`${api}/${id}`,
        {
            method: 'DELETE'
        })
} 
