import { useEffect, useState } from 'react';
import OrderHistory from '../components/OrderHistory';

export default function Orders() {


    const [orders, setOrders] = useState([]);

    const fetchOrder = () => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/users/getUserOrderedProducts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrders(data);
        })
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        
            <OrderHistory ordersData={orders} fetchUser={fetchOrder} />
        
    )
}