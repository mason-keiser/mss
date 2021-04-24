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

  const Cart = (props) => {

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const items = ((props.cartItems !== null && props.cartItems !== undefined) || props.cartItems.length !== 0) 
    ?  (props.cartItems.map((product, index) => {
            return(
                <div className='m-auto'  key={index}>
                    <div className='cartI'>
                        <CartItem
                        setSingPost={props.setSingPost}
                        setView={props.setView}
                        product={product}
                        />
                    </div>
                </div>
            );
        })
    )
    : null

    const prevItems = (props.cartItems.length === 0) 
        ? (
            <h3 className='prevCart mb-4'>No items in cart</h3>
        ) 
        :  (
            <h3 className='prevCart mb-4'>There are {props.cartItems.length} item(s) in your cart</h3>
        )

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>My Cart</h1>
            </div>
            <div className='d-flex flex-column'>
                {prevItems}
                {items}
            </div>
            <div className='toTop' onClick={() => null}>
                <div className='fas fa-shopping-cart' style={{color: 'white'}}></div>    
            </div> 
        </div>
    )
  }

  export default Cart