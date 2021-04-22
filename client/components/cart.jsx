import React from 'react'
import ItemCard from './itemCard'
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

    const items = (props.cartItems !== null && props.cartItems !== undefined) 
    ?  (props.cartItems.map((product, index) => {
            return(
                <div className='m-auto'  key={index}>
                    <div className='cartI'>
                        <ItemCard
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

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>My Cart</h1>
            </div>
            <div className='d-flex flex-column'>
                {items}
            </div>
            <div className='toTop' onClick={() => null}>
                <div className='fas fa-shopping-cart' style={{color: 'white'}}></div>    
            </div> 
        </div>
    )
  }

  export default Cart