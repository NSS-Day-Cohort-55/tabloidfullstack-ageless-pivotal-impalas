import { Card } from "reactstrap";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
	let readTime = Math.ceil(post.content.split(" ").length / 265);

	if (readTime <= 1) {
		readTime = `${readTime} min`;
	} else {
		readTime = `${readTime} mins`;
	}

	return (
		<Card className="mb-3">
			<h3>{post.title}</h3>
			<p>{post.userProfile.displayName}</p>
			<p>Category: {post.category.name}</p>
			<p>Est. Read Time: {readTime}</p>
		</Card>
	);
};
