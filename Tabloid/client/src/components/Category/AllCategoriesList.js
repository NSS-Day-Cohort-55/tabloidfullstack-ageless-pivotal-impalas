import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/catManager";

export const AllCategoriesList = () => {
    let [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, [])

    return (
        <section>
            <ul>
                {categories.map(c => {
                    return (
                        <li key={c.id}>{c.name}</li>
                    )
                })}
            </ul>
        </section>
    )
}