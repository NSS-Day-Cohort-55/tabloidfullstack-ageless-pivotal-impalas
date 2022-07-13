import React, { useEffect, useState } from "react";
import { getAllTags } from "../../modules/tagManager";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const TagList = () => {
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then(tags => setTags(tags));
    };

    useEffect(() => {
        getTags();
    }, []);

    return (
        <div className="container">
            <Link to="/tag/create">Create New Tag</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {tags.map((t) => {
                        return (
                            <ListGroupItem key={t.id}>
                                {t.name} <Link to={`/tag/edit/${t.id}`}>Edit</Link>{" "}
                                <Link to={`/tag/delete/${t.id}`}>Delete</Link>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default TagList;
