import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../modules/postManager";
import { Post } from "./Post";

export const PostList = () => {
    const [posts, setPosts] = useState();

    const getPosts = () => {
        getAllPosts().then(allPosts => setPosts(allPosts))
        getAllPosts().then(r => console.log(r))
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            <div className="container">
                <h2>Posts</h2>
                <div className="row justify-content-center">
                    {
                        posts?.map((post) => <Post post={post} key={`post-${post.id}`} />)
                    }
                </div>
            </div>
        </>
    )
}