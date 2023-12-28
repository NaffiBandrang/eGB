import React, { useState } from 'react';

import ProductCard from './ProductCard';

const ProductSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}/b4/products/search`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productName: searchQuery})
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error Searching for products: ', error)
        }
    };

    return (
        <div className='productSearch'>
            <h4>Product Search</h4>
            <div className='form-group'>
                
                <input type='text' id='productName' className='form-control' value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder='Product Name'/>
            </div>

            <button className='btn btn-primary mt-2' onClick={handleSearch}>Search</button>

            
            <ul>
                {searchResults.map(product => (
                    <>
                        <ProductCard productProp={product} key={product._id} />
                    </>
                ))}
            </ul>
        </div>
    );
};

export default ProductSearch;