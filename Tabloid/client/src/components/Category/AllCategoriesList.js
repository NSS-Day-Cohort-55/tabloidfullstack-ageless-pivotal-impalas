import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../modules/catManager";
import './AllCategoriesList.scss'

export const AllCategoriesList = () => {
    let [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, [])

    return (
        <>
            <section className="all-categories-list">
                <img src="quill-logo.png"></img>
                <h3>CATEGORY MANAGEMENT</h3>
                {categories.map(c => {
                    return (
                        <div className="item" key={c.id}>{c.name} <div className="button-container"><button className="edit">EDIT</button><button className="delete">DELETE</button></div></div>
                    )
                })}
                <section className="add">
                    <input placeholder="Add a new category"></input>
                    <button>SAVE</button>
                </section>
            </section>

        </>
    )
}