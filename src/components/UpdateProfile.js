import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';



export default function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [message, setMessage] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        
    const token = localStorage.getItem('token');

    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/b4/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo
      })
    });
      
    if (response.ok) {
        Swal.fire({
          title: 'Profile Updated',
          icon: 'success',
          text: 'Profile Updated Successfully'
        });
        setFirstName('');
        setLastName('');
        setMobileNo('')
    } else {
        const errorData = await response.json();
        setMessage(errorData.message);
    }
    } catch (error) {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Please try again'
        })
    }
    
  };

  return (
    <div className="container mt-3 mb-3">
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="mobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}


