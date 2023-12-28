import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

export default function ArchiveCourse({user, isAdmin, fetchUsers}){

    const setAdminToggle = (userId) => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/users/${userId}/update-user-as-admin`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data === true) {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "User updated as Admin successfully"
                })
                fetchUsers();
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please Try Again"
                })
                fetchUsers();
            }
        })
    }

    const setUserToggle = (userId) => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/users/${userId}/update-admin-as-user`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data === true) {
                Swal.fire({
                    title: "Success",
                    icon: "success",
                    text: "Admin updated as User successfully"
                })
                fetchUsers();
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please Try Again"
                })
                fetchUsers();
            }
        })
    }

    return (
        <>
            {isAdmin ?
             <Button variant="danger" size="sm" onClick={() => setUserToggle(user)}>Set as User</Button>
            :
            <Button variant="success" size="sm" onClick={() => setAdminToggle(user)}>Set as Admin</Button>
            }
        </>
    )
}