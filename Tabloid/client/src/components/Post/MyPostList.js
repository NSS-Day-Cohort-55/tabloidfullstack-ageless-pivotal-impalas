import React, { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../modules/postManager";
import { getUserByFirebaseId } from "../../modules/authManager";
import './MyPostList.scss'

export const MyPostList = () => {
    let [posts, setPosts] = useState([])

    useEffect(() => {
        getUserByFirebaseId().then(user => getAllPostsByUser(user.id)).then(data => setPosts(data));
    }, [])

    return (
        <div className="post-container">
            <h1>My Posts</h1>
            {posts.map(post => {
                return (
                    <div className="post-card" key={post.id}>
                        <img src={post.imageLocation}></img>
                        <div className="post-content">
                            <div className="title-content">
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                            </div>
                            <div className="misc">
                                <p>Published on:</p>
                                <span>{post.publishDateTime.split("T")[0]}</span>
                                <p>Category:</p>
                                <span>{post.category.name}</span>
                                <p>Read Time:</p>
                                <span>6 minutes</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}