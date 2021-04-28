import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Accessories from './accessories';
import HomeCarousel from './carousel';
import Nav from './nav'
import Searched from './search';
import ShopAll from './shopAll';
import SingPost from './singPost';
import Surf from './surf';
import Wetsuits from './wetsuits';
import ViewProd from './singPost'
import Cart from './cart'
import {
    Link,
    animateScroll as scroll
  } from 'react-scroll';
import CheckOut from './checkout';
import CheckoutSuccess from './checkoutSuccess';


const App = () => {
    const [view, setView] = useState({ name: 'home', params: {}});
    const [allProducts, setAllProducts] = useState('all products');
    const [surfProducts, setSurfProducts] = useState('surf products');
    const [wetsuitProducts, setWetsuitProducts] = useState('wetsuit products')
    const [accessoryProducts, setAccessoryProducts] = useState('accessory products')
    const [searchedItems, setSearchedItems] = useState('search items')
    const [singPost, setSingPost] = useState('singular post');
    const [cartItems, setCartItems] = useState([]);
    const [entranceModal, setEntranceModal] = useState(true);
    const [total, setTotal] = useState();

    const modalTerp = (entranceModal == true) ? (
        <div className='modall'>
            <h3>Welcome to Mas' Surf Shop</h3>
            <p>Mas’s Surf Shop is a full stack eCommerce shopping app that was created strictly for demonstration purposes. By clicking the button below, you accept that no purchases will be made, no payment processing will be done, and that actual personal information should not be used in checkout; such as, real names, addresses, or credit card information</p>
            <div>
                <button onClick={() => setEntranceModal(false)} className='orderBtn'>I accept</button>
            </div>
        </div>
    ): null

    useEffect(() => {},[cartItems])

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
            getCartItems()
    }, [])

    const getCartItems = () => {
        fetch('/api/cart', {
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
                    const newItems = cartItems.concat(result).reverse()
                    setCartItems(newItems)
                }
            })
    }

    const deleteCartItem = (cartItemId) => {
        fetch('/api/deleteItem', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItemId)
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
                    let newArr = []
                    let trash = []
                    for (let i = 0; i < cartItems.length; i++) {
                        if (result.cartItemId === cartItems[i].cartItemId) {
                            trash.push(cartItems[i])
                        } else {
                            newArr.push(cartItems[i])
                        }
                    }
                    setCartItems(newArr)
                }
            })
    }

    const postToCart = (productid) => {
        fetch('/api/cartPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productid)
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
                const newItems = cartItems.concat(result).reverse()
                   setCartItems(newItems)
                   setView({ name: 'cart', params: {}})
                }
            })
    }

    const placeOrder = (orderInfo) => {
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderInfo)
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
                    setView({ name: 'checkoutsuccess', params: {}})
                   setCartItems([])
                }
            })
    }

    const updateQty = (qtyObj) => {
        fetch('/api/updQty', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(qtyObj)
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
                    setCartItems(result.sort(function(a, b) {
                        return b.cartItemId - a.cartItemId;
                    }))
                    scroll.scrollToTop();
                }
            })
    }

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
                            : (view.name === 'viewprod')
                                ? <ViewProd postToCart={postToCart} getCartItems={getCartItems} setView={setView} setSingPost={setSingPost} singPost={singPost}/>
                                : (view.name === 'cart')
                                    ? <Cart updateQty={updateQty} deleteCartItem={deleteCartItem} setSingPost={setSingPost} cartItems={cartItems} setView={setView}/>
                                    : (view.name === 'checkout')
                                        ? <CheckOut setTotal={setTotal} placeOrder={placeOrder} setView={setView} view={view}/>
                                        : (view.name === 'checkoutsuccess')
                                            ? <CheckoutSuccess total={total} setTotal={setTotal} setView={setView} />
                                            : null
    return (
        <div className='b'>
            {modalTerp}
            <Nav cartItems={cartItems} searchItems={searchItems} setView={setView}/>
            {viewTern}
        </div>
    )
}

export default App