import React from 'react'
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";


export default function UserPage() {
    const Navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem('userInfo');
        Navigate("/")

    }
    return (
        <div className='container m-4 p-4 d-grid' style={{placeItems:"center"}}>
            <h2>Welcome You Are a User</h2>
            <Button
                colorScheme="red"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={Logout}
                w={20}
            >
                Logout
            </Button>
        </div>
    )
}
