const api = "/api/category"
export const getAllCategories = () => {
    return fetch(`${api}`).then(res => res.json())
}