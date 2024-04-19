import React, { useState, useEffect } from 'react';
import AdminPage from './AdminPage';
import UserPage from './UserPage';

export default function MainPage() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem('userInfo');
        if (userDataString) {
            const parsedUserData = JSON.parse(userDataString);
            setUserData(parsedUserData);
        }
    }, []);

    if (!userData || !userData.user || !userData.user.Role) {
        // If userdata is missing or incomplete, return null
        return null;
    }

    return (
        <div className='container-fluid' style={{ border: '2px solid black' }}>
            {userData.user.Role === 'Admin' ? <AdminPage /> : <UserPage />}
        </div>
    );
}
