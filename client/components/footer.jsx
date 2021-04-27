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

  const Footer = (props) => {

    return (
        <div className='fcontainer shadow-lg'>
             <div className='logoIcon2'>
                <img src='/images/icon.png'></img>
                <h2>Mas' Surf Shop</h2>
            </div>
        </div>
    )
  }

  export default Footer