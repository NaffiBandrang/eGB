import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import SetUser from './SetUser';



export default function UsersData({ userData, fetchUsers}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(userData);
        const userArr = userData.map(user => {
            return (
                <tr>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNo}</td>
                    <td className={user.isAdmin ? "text-success" : "text-danger"}>{user.isAdmin ? "Admin" : "User"}</td>
                    <td><SetUser user={user._id} isAdmin={user.isAdmin} fetchUsers={fetchUsers} /></td>
                    

                </tr>
            )
        })

        setUsers(userArr);
    }, [userData])

    return (
        <>
            
            <h1 className='text-center my-4'>Users List</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Status</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </Table>
        </>
    )

}