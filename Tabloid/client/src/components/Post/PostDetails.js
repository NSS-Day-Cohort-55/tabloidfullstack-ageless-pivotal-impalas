import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById, addReactionToPost, getReactionPostList } from "../../modules/postManager";
import { getAllReactions } from "../../modules/reactionManager";
import { getPostById } from "../../modules/postManager";
import { getPostTagsByPostId } from "../../modules/postTagManager";
import "./PostDetails.css";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const [tags, setTags] = useState([])
    const { id } = useParams()
    const [reactions, setReactions] = useState([]);
    const [postReactions, setPostReactions] = useState([]);
    const getPost = () => {
        getPostById(id).then(postFromApi => setPost(formatPost(postFromApi)))
    }

    const formatPost = (post) => {
        post.title = post.title.toUpperCase();
        post.publishDateTime = post.publishDateTime.split("T")[0]
        return post;
    }

    useEffect(() => {
        getPost();
        getAllReactions().then((data) => {
            setReactions(data);
        });
        getReactionPostList().then((data) => setPostReactions(data));
    }, []);

    useEffect(() => {
        if (post != undefined) {
            getPostTagsByPostId(post.id).then(data => setTags(data))
        }
    }, [post])

    return (
        <>
                <div className="reactionList">
                    {reactions.map((r) => {
                        
                            <button
                                key={r.id}
                                onClick={() => {
                                    const copy = {
                                        postId: post.id,
                                        reactionId: r.id,
                                    };
                                    addReactionToPost(copy).then(() => {
                                        getReactionPostList().then((data) => setPostReactions(data));
                                    });
                                }}
                            >
                                <img src={r.imageLocation} />
                                {
                                    postReactions.filter(
                                        (react) => react.reactionId === r.id && react.postId === post.id
                                    ).length
                                }
                            </button>
                        
                    })}
                </div>
            <div className="container justify-content-center">
                <div className="d-flex justify-content-center">{post?.imageLocation ? <img src={`${post.imageLocation}`} alt="banner" /> : ''}</div>
                <h1 className="center black-text">{post?.title.toUpperCase()}</h1>
                <h3 className="center red-text">{post?.category.name}</h3>
                <p className="grey-text"><em>tags: {tags?.map((t, index) => {
                    return (
                        (index ? ', ' : '') + t.name
                    )
                })} </em></p>
                <div className="d-flex justify-content-between">
                    <p className="grey-text">{post?.userProfile.displayName}</p>
                    <p className="grey-text">{post?.publishDateTime}</p>
                </div>
                <p className="grey-text">{post?.content}</p>
            </div>
        </>
    )
}