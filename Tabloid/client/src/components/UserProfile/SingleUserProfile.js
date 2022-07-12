import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const SingleUserProfile = ({ userProfile }) => {

    console.log(userProfile);
    return (
        <Card className="mt-2">
            <CardBody>
                <p><strong>DisplayName:</strong> {userProfile.displayName}</p>
                <p><strong>FullName:</strong> {userProfile.fullName}</p>
                <p><strong>UserType:</strong> {userProfile.userType?.name}</p>
            </CardBody>
        </Card>
    );
};

export default SingleUserProfile;