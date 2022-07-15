import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getUserByFirebaseId } from "../../modules/authManager";
import { getAllCategories } from "../../modules/catManager";
import { getAllPosts, getAllPostsByCategory } from "../../modules/postManager";
import { Post } from "./Post";

export const PostList = () => {
    const [posts, setPosts] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();


    const getPosts = () => {
        getAllPosts().then(allPosts => setPosts(allPosts))
    }

    const handleAddPostButton = () => {
        navigate("/posts/add");
    }

    const handleEditClick = (e) => {
        navigate(`/posts/edit/${e.target.id.split("-")[1]}`)
    }

    const handleInput = (e) => {
        const categoryId = e.target.value
        console.log(categoryId)
        if (categoryId == 0) {
            console.log("IM HERE")
            getPosts()
        } else {
            getAllPostsByCategory(e.target.value).then(filteredPosts => setPosts(filteredPosts))
        }
    }

    useEffect(() => {
        getPosts()
        getUserByFirebaseId().then(r => setCurrentUser(r))
        getAllCategories().then(r => setCategories(r))
    }, [])

    return (
        <>
            <div className="container">
                <button type="button" className="btn btn-primary" onClick={handleAddPostButton}>Add Post</button>
                <br></br>
                <select className="mt-2" onChange={handleInput}>
                    <option value="0">All categories</option>
                    {categories.map(t => {
                        return (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        )
                    })}
                </select>
                <h2>Posts</h2>
                <div className="row justify-content-center">
                    {
                        posts?.map((post) =>
                            <>
                                <Link to={`${post.id}`} style={{ textDecoration: 'none', color: '#212529' }}><Post post={post} key={`post-${post?.id}`} /></Link>
                                <div className="mb-3">
                                    {currentUser.id == post.userProfileId ?
                                        <Button classNamecolor="secondary" onClick={handleEditClick} id={`post-${post?.id}`}>Edit Post</Button>
                                        :
                                        ""
                                    }
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}