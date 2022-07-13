import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/postManager";
import "./PostDetails.css";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const { id } = useParams()

    const getPost = () => {
        getPostById(id).then(postFromApi => setPost(formatPost(postFromApi)))
    }

    const formatPost = (post) => {
        post.title = post.title.toUpperCase();
        post.publishDateTime = post.publishDateTime.split("T")[0]
        return post;
    }

    useEffect(() => {
        getPost()
    }, []);

    return (
        <>
            <div className="container justify-content-center">
                <div className="d-flex justify-content-center">{post?.imageLocation ? <img src={`${post.imageLocation}`} alt="banner" /> : ''}</div>
                <h1 className="center black-text">{post?.title.toUpperCase()}</h1>
                <h3 className="center red-text">{post?.category.name}</h3>
                <div className="d-flex justify-content-between">
                    <p className="grey-text">{post?.userProfile.displayName}</p>
                    <p className="grey-text">{post?.publishDateTime}</p>
                </div>
                <p className="grey-text">{post?.content}</p>
            </div>
        </>
    )
}