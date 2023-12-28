import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';

import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Products() {
    
    const { user } = useContext(UserContext);
    
    const [products, setProducts] = useState([]);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/b4/products/all`)
        .then(res => res.json())
        .then(data => {
            console.log("data", data);
            setProducts(data);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            {user.isAdmin === true ? 
                <AdminView productsData={products} fetchData={fetchData} />
            :
                <UserView productsData={products} />
            }
        </>
    )
   
}