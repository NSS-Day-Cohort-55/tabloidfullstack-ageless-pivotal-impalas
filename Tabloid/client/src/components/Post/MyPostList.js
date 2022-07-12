import React, { useEffect, useState } from "react";
import { getAllPostsByUser } from "../../modules/postManager";
import { getToken } from "../../modules/authManager";

export const MyPostList = () => {
    let [posts, setPosts] = useState([])

    useEffect(() => {
        getToken().then(data => console.log(data))
        getAllPostsByUser(3).then(data => console.log(data))
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