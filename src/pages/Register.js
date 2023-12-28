import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {

    const { user, setUser } = useContext(UserContext);

    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isActive, setIsActive] = useState(true);

	const navigate = useNavigate();

    function registerUser(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/b4/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                setFirstName("");
                setLastName("");
				setEmail("");
				setMobileNo("");
				setPassword("");
				setConfirmPassword("");

				Swal.fire({
					title: "Registered Successfully",
					icon: "success",
					text: "Welcome to eGamersBlitz"

				});

				navigate("/login");
            } else {
                Swal.fire({
					title: "Something went wrong",
					icon: "error",
					text: "Please Try Again"

				});
            }
        })

    }

    useEffect(() => {
		
		if(
			(firstName !== "" &&
			lastName !== "" &&
			email !== "" &&
			mobileNo !== "" &&
			password !== "" &&
			confirmPassword !== "") &&
			(password === confirmPassword) &&
			(mobileNo.length === 11)
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

	}, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
		(user.id !== null) ?
			<Navigate to="" />
		:
        <Form onSubmit={(e) => registerUser(e)} className='registerForm' >
			<h2 className='text-center mt-5'>Register</h2>
            <Form.Group>
					<Form.Label>First Name:</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Enter First Name" 
						required
						value={firstName}
						onChange={e => {setFirstName(e.target.value)}}
					/>
			</Form.Group>

			<Form.Group>
					<Form.Label>Last Name:</Form.Label>
					<Form.Control 
						type="text" 
						placeholder="Enter Last Name" 
						required 
						value={lastName}
						onChange={e => {setLastName(e.target.value)}}
					/>
			</Form.Group>

			<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
						type="email" 
						placeholder="Enter Email" 
						required 
						value={email}
						onChange={e => {setEmail(e.target.value)}}
					/>
			</Form.Group>

			<Form.Group>
					<Form.Label>Mobile No:</Form.Label>
					<Form.Control 
						type="number" 
						placeholder="Enter 11 Digit No." 
						required 
						value={mobileNo}
						onChange={e => {setMobileNo(e.target.value)}}
					/>
			</Form.Group>

			<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Enter Password." 
						required 
						value={password}
						onChange={e => {setPassword(e.target.value)}}
					/>
			</Form.Group>

			<Form.Group>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control 
						type="password" 
						placeholder="Confirm Password." 
						required 
						value={confirmPassword}
						onChange={e => {setConfirmPassword(e.target.value)}}
					/>
			</Form.Group>
            
				{ isActive ?
					<Button variant="primary" type="submit" >Submit</Button>
					:
					<Button variant="danger" type="submit" >Submit</Button>

				}
        </Form>
    )
}
