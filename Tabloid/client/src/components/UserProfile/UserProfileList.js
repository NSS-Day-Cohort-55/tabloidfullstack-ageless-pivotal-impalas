import React, { useEffect, useState } from "react";
import SingleUserProfile from './SingleUserProfile';
import { getAllUserProfiles } from "../../modules/userProfileManager";

const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    console.log("Inside UserProfileList");
    const getUserProfiles = () => {
        console.log("calling API");
        getAllUserProfiles().then(userProfilesFromAPI => setUserProfiles(userProfilesFromAPI));
    };

    useEffect(() => {
        getUserProfiles();
    }, []);

    return (
        <div className="container">

            <h2>User Profiles</h2>
            <div className="row justify-content-center">
                {userProfiles && userProfiles.map((up) => (
                    <SingleUserProfile userProfile={up} key={up.id} />
                ))}
            </div>
        </div>
    );
};

export default UserProfileList;