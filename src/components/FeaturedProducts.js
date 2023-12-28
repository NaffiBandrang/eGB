import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {

    const [previews, setPreviews] = useState([]);

    useEffect(() => {

        fetch(`${ process.env.REACT_APP_API_URL}/b4/products/active`)
        .then(res => res.json())
        .then(data => {

            const numbers = [];
            const featured = [];

            const generateRandomNums = () => {
                let randomNum = Math.floor(Math.random() * data.length);

                if(numbers.indexOf(randomNum) === -1) {
                    numbers.push(randomNum);
                } else {
                    generateRandomNums()
                }
            }

            for(let i = 0; i < 4; i++){
                generateRandomNums()

                featured.push(
                    <PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
                )
            }

            setPreviews(featured);
        })
    }, [])

    return (
        <>
            <h2 className='text-center my-4'>Hot Picks for Today!</h2>
            <CardGroup className='justify-content-center my-3 featuredGroup'>
                {previews}
            </CardGroup>
        </>
    )
}