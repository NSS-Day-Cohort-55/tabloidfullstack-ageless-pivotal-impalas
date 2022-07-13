import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../modules/postManager";
import { getPostTagsByPostId } from "../../modules/postTagManager";
import "./PostDetails.css";
import { getAllTags } from "../../modules/tagManager";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const [currentTags, setCurrentTags] = useState([])
    const [tagList, setTagList] = useState([])
    const [selectedTag, setselectedTag] = useState("0")
    const { id } = useParams()

    const getPost = () => {
        getPostById(id).then(postFromApi => setPost(formatPost(postFromApi)))
    }

    const getTags = () => {
        getAllTags().then(data => setTagList(data))
    }

    const formatPost = (post) => {
        post.title = post.title.toUpperCase();
        post.publishDateTime = post.publishDateTime.split("T")[0]
        return post;
    }

    useEffect(() => {
        getPost()
        getTags()
    }, []);

    useEffect(() => {
        if (post != undefined) {
            getPostTagsByPostId(post.id).then(data => setCurrentTags(data))
        }
    }, [post])

    const handleInput = event => {
        setselectedTag(event.target.value)
        console.log(selectedTag);
    }

    const addTag = () => {
        if (selectedTag != "0") {
            //use selectedTag and post.Id to create new PostTag and then update currentTags state
        }
        else {
            window.alert("Please select a tag.")
        }
    }

    return (
        <>
            <div className="container justify-content-center">
                <div className="d-flex justify-content-center">{post?.imageLocation ? <img src={`${post.imageLocation}`} alt="banner" /> : ''}</div>
                <h1 className="center black-text">{post?.title.toUpperCase()}</h1>
                <h3 className="center red-text">{post?.category.name}</h3>
                <p className="grey-text"><em>tags: {currentTags?.map((t, index) => {
                    return (
                        (index ? ', ' : '') + t.name
                    )
                })} </em></p>
                <div className="d-flex justify-content-between">
                    <p className="grey-text">{post?.userProfile.displayName}</p>
                    <p className="grey-text">{post?.publishDateTime}</p>
                </div>
                <p className="grey-text">{post?.content}</p>
                <p>
                    new tag
                    <select onChange={handleInput}>
                        <option value="0">---</option>
                        {tagList.map(t => {
                            return (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            )
                        })}
                    </select>
                    <button onClick={addTag}>add</button>
                </p>
            </div>
        </>
    )
}