import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import HomeCarousel from './carousel';
import Nav from './nav'
import ShopAll from './shopAll';


const App = () => {
    const [view, setView] = useState({ name: 'home', params: {}});
    const [allProducts, setAllProducts] = useState('all products');
    const [surfProducts, setSurfProducts] = useState('surf products');
    const [wetsuitProducts, setWetsuitProducts] = useState('wetsuit products')
    const [accessoryProducts, setAccessoryProducts] = useState('accessory products')

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
        let surf = [];
        let wetsuits = [];
        let accessories = [];

        if (allProducts) {
            for (let i = 0; i < allProducts.length; i++) {
                if (allProducts[i].itemtype === 2) {
                    surf.push(allProducts[i])
                } else if (allProducts[i].itemtype === 1) {
                    wetsuits.push(allProducts[i])
                } else if (allProducts[i].itemtype === 3) {
                    accessories.push(allProducts[i])
                }
            }
            setSurfProducts(surf)
            setWetsuitProducts(wetsuits)
            setAccessoryProducts(accessories)
        }
    },[allProducts])

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
                : (view.name === 'wetsuits')
                    ? null
                    : (view.name === 'accessories')
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