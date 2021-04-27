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

  const CheckOut = (props) => {

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>Checkout</h1>
            </div>
            <div>
                <h2 style={{textAlign: 'center'}}>Total: {props.view.params.price}</h2>
            </div>
        </div>
    )
  }

  export default CheckOut