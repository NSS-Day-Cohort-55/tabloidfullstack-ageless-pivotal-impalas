import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { getPostByTagId } from "../../modules/tagManager.js";
import { Post } from "../Post/Post.js"

export const PostByTagList = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const getTagPosts = () => {
    getPostByTagId(id).then((posts) => setPosts(posts));
  };

  useEffect(() => {
    getTagPosts();
  }, [id]);
console.log(posts)
  return (
    <Container>
      {posts.length === 0
        ? `There are no posts to display for this Tag`
        : posts.map((p) => <Post post={p} key={`Tag-post-${p.id}`} />)}
    </Container>
  );
};

export default PostByTagList;