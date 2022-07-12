import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/postManager";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const { id } = useParams()

    const getPost = () => {
        getPostById(id).then(r => setPost(r))
    }

    useEffect(() => {
        getPost()
    }, []);

    return (
        <>
        <div><img src={``}/></div>
        </>
    )
}