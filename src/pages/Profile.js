import { useState, useContext, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate, Link} from 'react-router-dom';
import UserContext from '../UserContext';


export default function Profile() {

    const { user } = useContext(UserContext);

    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }  
        })
        .then(res => res.json())
        .then(data => {
            if(typeof data._id !== "undefined"){
                setDetails(data);
            }
        })
    }, [])

    return (

        (user.id == null) ?
            <Navigate to="/login" />
        :
        <>
        <Row>
            <Col className='p-5 bg-profile'>
                <h1 className='my-5'>Profile</h1>
                <h2 className='mt-3'>{`${details.firstName} ${details.lastName}`}</h2>
                <hr />
                <h4>Contacts</h4>
                <ul id='contacts'>
                    <li>Email: {details.email}</li>
                    <li>Mobile Number: {details.mobileNo}</li>
                </ul>
            </Col>
        </Row>
        <Link to="/reset-password" className='btn btn-primary'>Reset Password</Link>
        <Link to="/update-profile" className='btn btn-primary'>Update Profile</Link>
        </>
    )
}