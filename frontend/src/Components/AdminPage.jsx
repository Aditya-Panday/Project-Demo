import React, { useEffect, useState } from 'react';
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState(null); // Initialize userData state with null
    const [filteredUsers, setFilteredUsers] = useState([]); // Initialize filteredUsers state with an empty array
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const allUserData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(
                "http://localhost:8000/api/auth/userData", config
            );
            console.log(data);
            setUserData(data);
            setFilteredUsers(data.allUsers); // Initialize filtered users with all users initially

        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm); // Update the search term state
        const filtered = userData.allUsers.filter(user => {
            // Filter users whose username contains the search term with (case insensitive)
            return user.userName.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredUsers(filtered); // Update the filtered users state
    };

    useEffect(() => {
        allUserData();
    }, []);

    const logout = () => {
        localStorage.removeItem('userInfo');
        navigate("/");
    }

    return (
        <div className='container' >
            <div className='my-4 d-flex gap-4'>
                <h3>Welcome You Are Admin</h3>
                <Button
className='mt-1'
                    colorScheme="red"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={logout}
                    w={20}

                >
                    Logout
                </Button>
            </div>
            <table className='table table-bordered border-dark  table-hover'>
                <thead>
                    <tr>
                        <th colSpan={4}>
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Search by name"
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </th>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsers.map((item, index) => {
                            return <tr key={index}>
                                {/* <td>{item._id}</td> */}
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.Role}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
