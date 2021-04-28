import React from 'react'
import CartItem from './cartItem'
import {
    Row,
    Col
  } from 'reactstrap';
  import {
    Link,
    animateScroll as scroll
  } from 'react-scroll';
  import { useEffect } from 'react';
import { useState } from 'react';

  const Cart = (props) => {
    const [priceState, setPrice] = useState('$0')
    const [cartQty, setCartQty] = useState()

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    useEffect(() => {
        const subtotals = document.querySelectorAll('.subtotal')
        let price = 0;
        let qty = 0
        if (!props.cartItems) {
            setPrice('$0')
            return null
        } else  {   
            for (let i = 0; i < subtotals.length; i++) {
                price = price + (Number(subtotals[i].id))
            }
            setPrice(price)
            for (let c = 0; c < props.cartItems.length; c++) {
                qty = qty + props.cartItems[c].quantity
            }
            setCartQty(qty)
        }
    },[props.cartItems])

    const items = ((props.cartItems !== null && props.cartItems !== undefined) || props.cartItems.length !== 0) 
    ?  (props.cartItems.map((product, index) => {
            return(
                <div className='m-auto'  key={index}>
                    <div className='cartI'>
                        <CartItem
                        updateQty={props.updateQty}
                        priceState={priceState}
                        cartItems={props.cartItems}
                        setSingPost={props.setSingPost}
                        setView={props.setView}
                        product={product}
                        deleteCartItem={props.deleteCartItem}
                        />
                    </div>
                </div>
            );
        })
    )
    : null

    const prevItems = (props.cartItems.length === 0) 
        ? (
            <div>
                <h2 style={{textAlign: 'center'}}>Total: {`$${(priceState / 100).toFixed(2)}`}</h2>
                <h4 className='prevCart mt-4'>No items in cart</h4>
            </div>
        ) 
        :  (
            <div>
                <h2 style={{textAlign: 'center'}}>Total: {`$${(priceState / 100).toFixed(2)}`}</h2>
                <h4 className='prevCart mt-4'>{cartQty} item(s) in cart</h4>
            </div>
        )

    const checkout = () => {
        if (!priceState) {
            return null
        } else  {
            props.setView({ name: 'checkout', params: {
                price: `$${(priceState / 100).toFixed(2)}`,
                cart: props.cartItems
            }})
        }
    }

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>My Cart</h1>
            </div>
            <div className='d-flex flex-column'>
                {prevItems}
                {items}
            </div>
            <div className='toTop' onClick={() => checkout()}>
                <div className='fas fa-shopping-cart' style={{color: 'white'}}></div>    
            </div> 
        </div>
    )
  }

  export default Cart