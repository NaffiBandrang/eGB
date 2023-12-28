import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';


export default function OrderHistory({ ordersData }) {

    const [order, setOrder] = useState([]);

    
    useEffect(() => {
        console.log(ordersData);
        const ordersArr = ordersData.map(orders => {
            return (
                <tr>
                    <td>{orders.products[0].productId}</td>
                    <td>{orders.products[0].productName}</td>
                    <td>{orders.products[0].quantity}</td>
                    <td>{orders.totalAmount}</td>
                </tr>
            )
        })

        setOrder(ordersArr);
    }, [ordersData])

    return (
        <>
            <h1 className='text-center my-4'>Order History</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className='text-center'>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order}
                </tbody>
            </Table>
        </>
    )

}