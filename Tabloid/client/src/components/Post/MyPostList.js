import React, { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../modules/postManager";

export const MyPostList = () => {
    let [posts, setPosts] = useState([])

    useEffect(() => {
        getAllPostsByUser().then(data => setPosts(data))
    },[])

    return (
        <div>
            {posts.map(p => {
                <div>
                    <h4>{p.title}</h4>
                    <p>{p.content}</p>
                </div>
            })}
        </div>
    )
}