import { Card, CardTitle, CardBody } from "reactstrap";

export const Post = ({ post }) => {

    return (
        <Card className="mb-3">
            <h3>{post.title}</h3>
            <p>{post.userProfile.displayName}</p>
            <p>Category: {post.category.name}</p>
            <p>{post.content}</p>
        </Card>
    )
}