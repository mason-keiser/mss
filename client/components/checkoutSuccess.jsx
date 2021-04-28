import React from 'react'
import {
    Row,
    Col
  } from 'reactstrap';
  import {
    Link,
    animateScroll as scroll
  } from 'react-scroll';
  import { useEffect } from 'react';

  const CheckoutSuccess = (props) => {

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const backHome = () => {
        props.setTotal()
        props.setView({ name: 'home', params: {}})
    }

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>Summary</h1>
            </div>
            <div style={{textAlign: 'center'}}>
                <h2 className='m-1'>Cart Total: {props.total}</h2>
                <h3 className='m-4'>Thank you for placing an order, you will receive a confirmation email shortly!</h3>
            </div>
            <div className='m-5 d-flex justify-content-center'>
                <button className='orderBtn' onClick={() => backHome()}>Back to Shopping</button>
            </div>
        </div>
    )
  }

  export default CheckoutSuccess