import { Card } from "reactstrap";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {

    return (
        <Card className="mb-3">
            <h3>{post.title}</h3>
            <p>{post.userProfile.displayName}</p>
            <p>Category: {post.category.name}</p>
        </Card>
    )
}