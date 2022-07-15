import userEvent from "@testing-library/user-event";
import React, { useEffect, useState, useRef } from "react";
import { getAllCategories, addCategory, deleteCategory, updateCategory } from "../../modules/catManager";
import './AllCategoriesList.scss'

export const AllCategoriesList = () => {
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState("")
    const [editCategoryInput, setEditCategoryInput] = useState("")
    const [isEditing, setIsEditing] = useState(null)

    useEffect(() => {
        getAllCategories().then(data => setCategories(data))
    }, [])

    const handleInput = event => {
        if (event.target.id === "edit") {
            setEditCategoryInput(event.target.value)
        }
        else {
            setNewCategory(event.target.value)
        }

    }

    const add = () => {
        addCategory(newCategory).then(getAllCategories().then(data => setCategories(data))).then(() => setNewCategory(""))
    }

    const deleteCat = event => {
        deleteCategory(event.target.value).then(() => getAllCategories().then((data) => setCategories(data)))
    }

    const setCatToEditing = event => {
        setIsEditing(parseInt(event.target.id))
        setEditCategoryInput("")
    }

    const catEdit = event => {
        if (editCategoryInput !== "") {
            updateCategory(editCategoryInput, event.target.id).then(() => getAllCategories().then((data) => setCategories(data))).then(() => setIsEditing(null)).then(() => setEditCategoryInput(""))
        }
        else{
            window.alert("Please provide a new category name.")
        }
    }

    return (
        <>
            <section className="all-categories-list">
                <img src="quill-logo.png"></img>
                <h3>CATEGORY MANAGEMENT</h3>
                {categories.map(c => {
                    return (
                        <div className="item" key={c.id} >
                            {c.id === isEditing ?
                                <>
                                    <input id="edit" value={editCategoryInput} placeholder={c.name} onChange={handleInput} autoFocus />
                                    <div className="button-container">
                                        <button className="save" id={c.id} onClick={catEdit}>SAVE</button>
                                        <button className="cancel" id={0} onClick={setCatToEditing}>CANCEL</button>
                                    </div>
                                </>
                                :
                                <>
                                    <span id={"item" + c.id}>{c.name}</span>
                                    <div className="button-container">
                                        <button className="edit" id={c.id} onClick={setCatToEditing}>EDIT</button>
                                        <button className="delete" value={c.id} onClick={deleteCat} id={"delete" + c.id}>DELETE</button>
                                    </div>
                                </>
                            }

                        </div>
                    )
                })}
                <section className="add">
                    <input placeholder="Add a new category" value={newCategory} onChange={handleInput} id="add"></input>
                    <button onClick={add}>SAVE</button>
                </section>
            </section>

        </>
    )
}