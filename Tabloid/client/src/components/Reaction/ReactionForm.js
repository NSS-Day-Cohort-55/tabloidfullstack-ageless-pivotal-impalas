import React, { useState } from "react";
import { addReaction } from "../../modules/reactionManager";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ReactionForm = () => {
	const history = useNavigate();
	const ReactionForm = {
		Name: "",
        ImageLocation:"",
	};
	const [reaction, setReaction] = useState(ReactionForm);

	const handleInputChange = (evt) => {
		const value = evt.target.value;
		const key = evt.target.id;
		const reactionCopy = { ...reaction };
		reactionCopy[key] = value;
		setReaction(reactionCopy);
	};
	const handleSave = (evt) => {
		evt.preventDefault();
		if (!reaction.Name.length || !reaction.Name.trim()) {
			window.alert("please enter a value");
		} else {
			addReaction(reaction).then(() => {
				history("/");
			});
		}
	};

	return (
		<>
			<form>
				<h4>Create a Reaction</h4>
                <h2>Name</h2>
				<input type="text" name="name" id="Name" onChange={handleInputChange}></input>
                <h2>Image Location</h2>
				<input type="text" name="imageLocation" id="ImageLocation" onChange={handleInputChange}></input>
				<button type="submit" value="Submit" onClick={handleSave}>
					Submit
				</button>
			</form>
			<Link to="/reaction">back</Link>
		</>
	);
};
