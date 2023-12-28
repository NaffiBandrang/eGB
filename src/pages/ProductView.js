import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

    

   
    console.log({quantity});

    const checkOut = (productId, productName) => {

        fetch(`${ process.env.REACT_APP_API_URL }/b4/users/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                productId: productId,
                productName: productName,
                quantity: parseInt(quantity),
                totalAmount: parseInt(quantity) * price
                
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if(data.message === "Order Successful.") {
                Swal.fire({
                    title: "Order Successful",
                    icon: "success",
                    text: "Order successfully checked out."
                })

                navigate("/products");
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please try again."
                })
            }
        })
    }

    useEffect(() => {
        fetch(`${ process.env.REACT_APP_API_URL }/b4/products/${productId}`)
        .then(res => res.json())
        .then(data => {

            console.log(data);

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            

        })
    }, [productId])

    return (
        <Container className='mt-5'>
            <Row>
                <Col lg={{ span: 6, offset: 3}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price: ₱{price}</Card.Subtitle>
                            <Card.Text></Card.Text>
                            <Form.Group>
                            <Form.Label>Quantity:</Form.Label>
                                <Form.Control 
                                type="number" 
                                placeholder="Quantity" 
                                required
                                defaultValue={1}
                                onChange={e => {setQuantity(e.target.value)}}
					            />
			                </Form.Group>
                            {(user.id !== null) ?
                                <Button variant="primary" block onClick={() => checkOut(productId, name)}>Checkout</Button>
                            :
                                <Link className='btn btn-danger btn-block' to="/login">Log in to Order</Link> 
                            }            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}