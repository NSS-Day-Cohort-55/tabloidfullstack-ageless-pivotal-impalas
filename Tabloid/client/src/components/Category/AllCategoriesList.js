import userEvent from "@testing-library/user-event";
import React, { useEffect, useState, useRef } from "react";
import { getAllCategories, addCategory, deleteCategory, editCategory } from "../../modules/catManager";
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

    const inputEl = useRef(null)

    const editCat = () => {
        console.log(inputEl.current)
    }

    const updateCat = () => {

    }

    return (
        <>
            <section className="all-categories-list">
                <img src="quill-logo.png"></img>
                <h3>CATEGORY MANAGEMENT</h3>
                {categories.map(c => {
                    return (
                        <div className="item" key={c.id} ref={inputEl}>{c.name} <div className="button-container" id={c.id}><button className="edit" onClick={editCat}>EDIT</button><button className="delete" value={c.id} onClick={deleteCat}>DELETE</button></div></div>
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