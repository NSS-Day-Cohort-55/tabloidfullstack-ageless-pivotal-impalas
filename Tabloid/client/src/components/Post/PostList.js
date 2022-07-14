import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { getUserByFirebaseId } from "../../modules/authManager";
import { getAllPosts } from "../../modules/postManager";
import { Post } from "./Post";

export const PostList = () => {
    const [posts, setPosts] = useState();
    const [currentUser, setCurrentUser] = useState();
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

    useEffect(() => {
        getPosts()
        getUserByFirebaseId().then(r => setCurrentUser(r))
    }, [])

    return (
        <>
            <div className="container">
                <button type="button" className="btn btn-primary" onClick={handleAddPostButton}>Add Post</button>
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