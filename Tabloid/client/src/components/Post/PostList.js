import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPosts } from "../../modules/postManager";
import { Post } from "./Post";

export const PostList = () => {
    const [posts, setPosts] = useState();
    const navigate = useNavigate();


    const getPosts = () => {
        getAllPosts().then(allPosts => setPosts(allPosts))
    }

    const handleAddPostButton = () => {
        navigate("/posts/add");
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <div className="container">
            <button type="button" className="btn btn-primary" onClick={handleAddPostButton}>Add Post</button>
                <h2>Posts</h2>
                <div className="row justify-content-center">
                    {
                        posts?.map((post) => 
                        <Link to={`${post.id}`} style={{ textDecoration: 'none', color: '#212529' }}><Post post={post} key={`post-${post.id}`} /></Link>
                        )
                    }
                </div>
            </div>
        </>
    )
}