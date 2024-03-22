import React from 'react';
import { useParams } from 'react-router-dom';

const GetSingleUserDetailAdmin = () => {
    const id = useParams()
    console.log(id)
    return (
        <div>
            <h1>User Details</h1>
        </div>
    );
};

export default GetSingleUserDetailAdmin;