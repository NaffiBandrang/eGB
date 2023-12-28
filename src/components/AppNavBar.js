import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavBar() {

    const { user } = useContext(UserContext);

    return (
        
        <Navbar  expand="lg" className='navBar'>
            <Container fluid>
                <Navbar.Brand className='nav'>eGB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
                        

                        {(user.id !== null) ?

                            (user.isAdmin) ?
                            <>
                            <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                            <Nav.Link as={NavLink} to="/addProduct" exact="true">Add Product</Nav.Link>
                            <Nav.Link as={NavLink} to="/allUsers" exact="true">Users</Nav.Link>
                            <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                            :
                            <>
                            <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
                            <Nav.Link as={NavLink} to="/orders" exact="true">Orders</Nav.Link>
                            <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                            </>
                        :
                        <>
                        <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                        </>
                        }                       
                        
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}