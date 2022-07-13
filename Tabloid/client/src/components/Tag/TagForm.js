import React, { useState } from "react";
import { addTag } from "../../modules/tagManager";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const TagForm = () => {
	const history = useNavigate();
	const TagForm = {
		Name: "",
	};
	const [tag, setTag] = useState(TagForm);

	const handleInputChange = (evt) => {
		const value = evt.target.value;
		const key = evt.target.id;
		const tagCopy = { ...tag };
		tagCopy[key] = value;
		setTag(tagCopy);
	};
	const handleSave = (evt) => {
		evt.preventDefault();
		if (!tag.Name.length || !tag.Name.trim()) {
			window.alert("please enter a value");
		} else {
			addTag(tag).then(() => {
				history("/tag");
			});
		}
	};

	return (
		<>
			<form>
				<h4>Create a Tag</h4>
				<input type="text" name="name" id="Name" onChange={handleInputChange}></input>
				<button type="submit" value="Submit" onClick={handleSave}>
					Submit
				</button>
			</form>
			<Link to="/tag">back</Link>
		</>
	);
};
