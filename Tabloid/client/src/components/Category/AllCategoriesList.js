import React, { useEffect, useState } from "react";
import { getAllCategories, addCategory, deleteCategory } from "../../modules/catManager";
import './AllCategoriesList.scss'

export const AllCategoriesList = () => {
    let [categories, setCategories] = useState([])
    let [newCategory, setNewCategory] = useState("")

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, [])

    const handleInput = event => {
        setNewCategory(event.target.value)
    }

    const add = () => {
        addCategory(newCategory).then(getAllCategories().then(data => setCategories(data))).then(() => setNewCategory(""))
    }

    const deleteCat = event => {
        deleteCategory(event.target.value).then(() => getAllCategories().then((data) => setCategories(data)))
    }

    return (
        <>
            <section className="all-categories-list">
                <img src="quill-logo.png"></img>
                <h3>CATEGORY MANAGEMENT</h3>
                {categories.map(c => {
                    return (
                        <div className="item" key={c.id}>{c.name} <div className="button-container"><button className="edit">EDIT</button><button className="delete" value={c.id} onClick={deleteCat}>DELETE</button></div></div>
                    )
                })}
                <section className="add">
                    <input placeholder="Add a new category" value={newCategory} onChange={handleInput}></input>
                    <button onClick={add}>SAVE</button>
                </section>
            </section>

        </>
    )
}