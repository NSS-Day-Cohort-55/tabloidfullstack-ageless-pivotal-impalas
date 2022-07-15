import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllCategories } from '../../modules/catManager';
import { editPost, getPostById } from '../../modules/postManager';
import { useNavigate, useParams } from 'react-router-dom';



export const EditPostForm = () => {
    const [post, setPost] = useState(null)
    const [categories, setCategories] = useState();
    const navigate = useNavigate();
    const { id } = useParams();


    const handleSubmit = (event) => {
        event.preventDefault();
        editPost(post)
            .then(r => navigate(`/posts/${post.id}`))
    }

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/posts")
    }

    const handleInputChange = (event) => {
        const postCopy = { ...post }
        postCopy[event.target.id] = event.target.value
        setPost(postCopy)
    }

    const getCategories = () => {
        getAllCategories().then(r => setCategories(r))
    }

    useEffect(() => {
        getCategories()
        getPostById(id).then(r => setPost(r))
    }, [])

    return (
        <div className="container">
            <h1>Edit Post</h1>
            {post ?
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" value={post.title} id="title" placeholder="Post Title" onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Post</Label>
                        <Input type="textarea" name="content" value={post.content} id="content" placeholder="Post Content..." onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="categoryId">Category</Label>
                        <Input type="select" name="categoryId" value={post.categoryId} id="categoryId" onChange={handleInputChange}>
                            <option value="0">Select a Category</option>
                            {categories?.map(category =>
                                <option value={category.id}>{category.name}</option>
                            )}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="imageLocation">ImageUrl (optional)</Label>
                        <Input type="url" name="imageLocation" value={post.imageLocation} id="imageLocation" placeholder="Header Image URL" onChange={handleInputChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="publishDateTime">Publication Date (optional)</Label>
                        <Input type="date" name="publishDateTime" value={post.publishDateTime.split("T")[0]} id="publishDateTime" onChange={handleInputChange} />
                    </FormGroup>
                    <div>
                        <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
                :
                ""
            }
        </div>
    )
}