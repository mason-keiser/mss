import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import HomeCarousel from './carousel';
import Nav from './nav'
import ShopAll from './shopAll';


const App = () => {
    const [view, setView] = useState({ name: 'home', params: {}});
    const [allProducts, setAllProducts] = useState();

    useEffect(() => {
        fetch('/api/getAllProducts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        }) 
        .then(response => {
            if (response.status === 400 || response.status === 404) {
                return null
            } else {
                return response.json();
            }
            })
            .then(result => {
                if (!result) {
                    return null
                } else {
                    setAllProducts(result)
                }
            })
    }, [])

    const viewTern = (view.name === 'home')
        ? (
        <div>
            <HomeCarousel/>
            <ShopAll allProducts={allProducts} setView={setView}/>
        </div>
        )
        : (view.name === 'shopAll')
            ? <ShopAll allProducts={allProducts} setView={setView}/>
            : null

    return (
        <div>
            <Nav setView={setView}/>
            {viewTern}
        </div>
    )
}

export default App