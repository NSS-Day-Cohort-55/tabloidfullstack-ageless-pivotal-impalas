import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getPostTagsByPostId, CheckIfPtExists, addPt } from "../../modules/postTagManager";
import { getPostById, addReactionToPost, getReactionPostList, deletePost } from "../../modules/postManager";
import { getAllReactions } from "../../modules/reactionManager";
import "./PostDetails.css";
import { getAllTags } from "../../modules/tagManager";
import { Button } from "reactstrap";
import { getUserByFirebaseId } from "../../modules/authManager";

export const PostDetails = () => {
    const [post, setPost] = useState();
    const [currentTags, setCurrentTags] = useState([])
    const [tagList, setTagList] = useState([])
    const [selectedTag, setselectedTag] = useState("0")
    const [reactions, setReactions] = useState([]);
    const [postReactions, setPostReactions] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [deleteClicked, setDeleteClicked] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate()

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
        getAllReactions().then((data) => {
            setReactions(data);
        })
        getReactionPostList().then((data) => setPostReactions(data))
        getUserByFirebaseId().then(r => setCurrentUser(r))
    }, []);

    useEffect(() => {
        if (post !== undefined) {
            getPostTagsByPostId(post.id).then(data => setCurrentTags(data))
        }
    }, [post])

    const handleInput = event => {
        setselectedTag(event.target.value)
    }

    const toggleDeleteClicked = () => {
        deleteClicked ? setDeleteClicked(false) : setDeleteClicked(true)   
    }

    const actualDelete = () => {
        deletePost(post.id)
        navigate("/posts")
    }

    async function addTag() {
        if (selectedTag !== "0") {
            let alreadyExists = await CheckIfPtExists(post.id, selectedTag).then(data => data)
            if (alreadyExists) {
                window.alert("The post already has the selected tag.")
            }
            else {
                let postTag = {
                    postId: post.id,
                    tagId: selectedTag
                }
                addPt(postTag).then(() => getPostTagsByPostId(post.id)).then(data => setCurrentTags(data))
            }
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

                <div className="reactionList">

                    {reactions.map((r) => {
                        return (
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
                            </button>)

                    })}
                </div>
                <div>
                    {currentUser?.id !== post?.userProfileId ?
                        "" :
                        deleteClicked ?
                            <>
                            <p>Are you sure you would like to delete the post</p>
                                <Button color="danger" onClick={actualDelete}>Delete Post</Button>{' '}
                                <Button color="secondary" onClick={toggleDeleteClicked}>Cancel</Button>
                            </>
                            :
                            <Button color="danger" onClick={toggleDeleteClicked}>Delete Post</Button>
                    }

                </div>

            </div>
        </>
    )
}