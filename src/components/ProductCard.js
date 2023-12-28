import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export default function ProductCard({productProp}) {

    const { _id, name, description, price } = productProp;

    return (
        <Card className='productCard'>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{price}</Card.Text>
                <Link className='btn btn-primary' to={`/products/${_id}`}>Details</Link>
            </Card.Body>
        </Card>
    )
}

ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}