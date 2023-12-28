import { useEffect, useState } from 'react';
import UsersData from '../components/UsersData';

export default function Users() {


    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/users/allUsers`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUsers(data);
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        
            <UsersData userData={users} fetchUsers={fetchUsers} />
        
    )
}