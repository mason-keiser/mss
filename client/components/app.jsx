import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Accessories from './accessories';
import HomeCarousel from './carousel';
import Nav from './nav'
import Searched from './search';
import ShopAll from './shopAll';
import Surf from './surf';
import Wetsuits from './wetsuits';


const App = () => {
    const [view, setView] = useState({ name: 'home', params: {}});
    const [allProducts, setAllProducts] = useState('all products');
    const [surfProducts, setSurfProducts] = useState('surf products');
    const [wetsuitProducts, setWetsuitProducts] = useState('wetsuit products')
    const [accessoryProducts, setAccessoryProducts] = useState('accessory products')
    const [searchedItems, setSearchedItems] = useState('search items')
    const [singPost, setSingPost] = useState();

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
                if (allProducts[i].itemtype === 1) {
                    surf.push(allProducts[i])
                } else if (allProducts[i].itemtype === 2) {
                    wetsuits.push(allProducts[i])
                } else if (allProducts[i].itemtype === 3) {
                    accessories.push(allProducts[i])
                }
            }
            setSurfProducts(surf)
            setWetsuitProducts(wetsuits)
            setAccessoryProducts(accessories.reverse())
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

    const searchItems = (keyWord) => {
        fetch('/api/searchProducts/' + keyWord, {
            method: 'GET',
            header: { 'Content-Type': 'application/json'}
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
                    setSearchedItems(result)
                    setView({ name: 'search', params: {}})
                }
            })
    }

    const viewTern = (view.name === 'home')
        ? <HomeCarousel/>
        : (view.name === 'shopAll')
            ? <ShopAll setSingPost={setSingPost} allProducts={allProducts} setView={setView}/>
            : (view.name === 'surf')
                ? <Surf setSingPost={setSingPost} surfProducts={surfProducts} setView={setView}/>
                : (view.name === 'wetsuits')
                    ? <Wetsuits setSingPost={setSingPost} wetsuitProducts={wetsuitProducts} setView={setView}/>
                    : (view.name === 'accessories')
                        ? <Accessories setSingPost={setSingPost} accessoryProducts={accessoryProducts} setView={setView}/>
                        : (view.name === 'search')
                            ? <Searched setSingPost={setSingPost} searchItems={searchedItems} setView={setView}/>
                            : null
    return (
        <div>
            <Nav searchItems={searchItems} setView={setView}/>
            {viewTern}
        </div>
    )
}

export default App