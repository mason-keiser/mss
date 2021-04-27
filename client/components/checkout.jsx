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
import Footer from './footer';

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

            <form action="">
                <div className='wrapper mt-5'>
                    <div className='input-data'>
                        <textarea style={{resize: 'none'}}  name="" id="" cols="30" rows="10"></textarea>
                        <label htmlFor="">Email</label>
                    </div>
                    <div className='input-data'>
                        <textarea style={{resize: 'none'}}  name="" id="" cols="30" rows="10"></textarea>
                        <label htmlFor="">Credit Card</label>
                    </div>
                    <div className='input-data' id=''>
                        <textarea style={{resize: 'none'}} name="" id="addy" cols="30" rows="10"></textarea>
                        <label htmlFor="">Address</label>
                    </div>
                    <div className='mt-5'>
                        <input type="checkbox"/><span className='ml-3'>I acknowledge that this is purely for demonstration purposes and no real emails, addresses, or credit card information should be used for the purposes of this app</span>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
    )
  }

  export default CheckOut