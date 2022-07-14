import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from "firebase/app";
import { getAllCategories } from '../../modules/catManager';
import { addPost } from '../../modules/postManager';
import { getUserByFirebaseId } from '../../modules/authManager';
import { useNavigate } from 'react-router-dom';



export const CreatePostform = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: '',
    })
    const [currentUser, setCurrentUser] = useState()
    const [categories, setCategories] = useState();
    const navigate = useNavigate();


    const handleCreatePost = (event) => {
        event.preventDefault();
        post.userProfileId = currentUser.id
        addPost(post).then(r => navigate(`/posts/${r.id}`))
    }

    const handleInputChange = (event) => {
        const postCopy = {...post}

        postCopy[event.target.id] = event.target.value
        setPost(postCopy)
    }

    const getCategories = () => {
        getAllCategories().then(r => setCategories(r))
    }

    useEffect(() => {
        getCategories()
        getUserByFirebaseId().then(r => setCurrentUser(r))
    }, [])

    return (
        <div className="container">
            <h1>Create New Post</h1>
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Post Title" onChange={handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="content">Post</Label>
                    <Input type="textarea" name="content" id="content" placeholder="Post Content..." onChange={handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="categoryId">Category</Label>
                    <Input type="select" name="categoryId" id="categoryId" onChange={handleInputChange}>
                        <option value="0">Select a Category</option>
                        {categories?.map(category =>
                            <option value={category.id}>{category.name}</option>
                        )}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="imageLocation">ImageUrl (optional)</Label>
                    <Input type="url" name="imageLocation" id="imageLocation" placeholder="Header Image URL" onChange={handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="publishDateTime">Publication Date (optional)</Label>
                    <Input type="date" name="publishDateTime" id="publishDateTime" onChange={handleInputChange}/>
                </FormGroup>
                <Button onClick={handleCreatePost}>Submit</Button>
            </Form>
        </div>
    )
}