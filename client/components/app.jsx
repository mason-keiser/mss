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
        const navItems = document.querySelectorAll('.navItem')
        for (let i = 0; i < navItems.length; i++) {
            if (navItems[i].id === view.name) {
                navItems[i].style.color = 'red'
            } else {
                navItems[i].style.color = 'black'
            }
        }
    },[view]) 

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
                    setAllProducts(result.sort(function(a, b) {
                        return a.itemtype - b.itemtype;
                    }))
                }
            })
    }, [])

    const viewTern = (view.name === 'home')
        ? <HomeCarousel/>
        : (view.name === 'shopAll')
            ? <ShopAll allProducts={allProducts} setView={setView}/>
            : (view.name === 'surf')
                ? null
                : null
    return (
        <div>
            <Nav setView={setView}/>
            {viewTern}
        </div>
    )
}

export default App