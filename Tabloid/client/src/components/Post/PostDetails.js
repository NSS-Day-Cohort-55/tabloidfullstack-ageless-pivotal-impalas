import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/postManager";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const { id } = useParams()

    const getPost = () => {
        getPostById(id).then(r => setPost(r))
        getPostById(id).then(r => console.log(r))
    }

    useEffect(() => {
        getPost()
    }, []);

    return (
        <>
            <div>{post?.imageLocation ? <img src={`${post.imageLocation}`} alt="banner" /> : ''}</div>
            <h1>{post?.title}</h1>
            <h2>{post?.userProfile.displayName}</h2>
            <p>{post?.content}</p>
            <p>{post?.publishDateTime}</p>
        </>
    )
}