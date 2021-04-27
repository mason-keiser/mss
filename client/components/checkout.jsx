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
import { useState } from 'react';

  const CheckOut = (props) => {
    const [email, setEmail] = useState();
    const [card, setCard] = useState();
    const [addy, setAddy] = useState()

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const handleSubmit = (callback) => {
        const obj = {
            email: email,
            creditcard: card,
            address: addy
        }

        if (!obj.email) {
            document.getElementById('e').style.border = ' 1px solid red'
        } if (!obj.creditcard) {
            document.getElementById('c').style.border=' 1px solid red'
        } if (!obj.address) {
            document.getElementById('a').style.border = '1px solid red'
        } else {
            callback(obj)
        }
    }

    const handleChange = (event) => {
        if (event.target.id === 'email') {
            setEmail(event.target.value)
        } if (event.target.id === 'card') {
            setCard(event.target.value)
        } if (event.target.id === 'addy') {
            setAddy(event.target.value)
        }
    }

    return (
        <div className='container2' >
            <div className='pageTitle'>
                <h1>Checkout</h1>
            </div>
            <div>
                <h2 style={{textAlign: 'center'}}>Total: {props.view.params.price}</h2>
            </div>

            <form action="">
                <div className='wrapper mt-3'>
                    <div className='input-data' id='e'>
                        <textarea onChange={handleChange} required style={{resize: 'none'}}  name="" id="email" cols="30" rows="10"></textarea>
                        <label htmlFor="">Email</label>
                    </div>
                    <div className='input-data' id='c'>
                        <textarea onChange={handleChange} required style={{resize: 'none'}}  name="" id="card" cols="30" rows="10"></textarea>
                        <label htmlFor="">Credit Card</label>
                    </div>
                    <div className='input-data' id='a'>
                        <textarea onChange={handleChange} required style={{resize: 'none'}} name="" id="addy" cols="30" rows="10"></textarea>
                        <label htmlFor="">Address</label>
                    </div>
                    <div className=''>
                        <input type="checkbox"/><span className='ml-3'>I acknowledge that this is purely for demonstration purposes and no real emails, addresses, or credit card information should be used for the purposes of this app</span>
                    </div>
                    <div>
                        <button onClick={() => handleSubmit(props.placeOrder)} className='orderBtn'>Submit Order</button>
                    </div>
                </div>
            </form>
            <Footer/>
        </div>
    )
  }

  export default CheckOut