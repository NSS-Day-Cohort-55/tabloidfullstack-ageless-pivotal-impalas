import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteTag, getTagById } from "../../modules/tagManager";
import { Button } from "reactstrap";

export const TagDelete = () => {
	const history = useNavigate();
	const [tag, setTag] = useState();
	const { id } = useParams();
	useEffect(() => {
		getTagById(id).then(setTag);
	}, [id]);

	if (!tag) {
		return null;
	}

	const handleDelete = (evt) => {
		evt.preventDefault();
		deleteTag(id).then(() => {
			history("/tag");
		});
	};

	return (
		<div>
			<header>Are you sure you want to delete this tag?</header>
			<div>Tag: {tag.name}</div>
			<Button className="btn btn-primary" onClick={handleDelete}>
				Delete
			</Button>
			<Link to="/tag">Return to Index</Link>
		</div>
	);
};

export default TagDelete;
