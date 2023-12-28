import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Error() {

    return (
        <Row>
            <Col className='p-5 text-center'>
                <h1>404 - Page Not Found!</h1>
                <p>The page you are looking for cannot be found</p>
                <Link className='btn btn-primary' to="/">Return to Home Page</Link>
            </Col>
        </Row>
    )
}