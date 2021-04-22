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

  const ViewProd = (props) => {

    const close = () => {
        if (props.singPost.itemtype === 1) {
            props.setView({ name: 'surf', params: {}})
            setSingPost('')
        } else if (props.singPost.itemtype === 2) {
            props.setView({ name: 'wetsuits', params: {}})
            setSingPost('')
        } else if (props.singPost.itemtype === 3) {
            props.setView({ name: 'accessories', params: {}})
            setSingPost('')
        }
    }

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const price = Number(props.singPost.price)

    return (
        <div className='itemContainer'>
            <span onClick={() => close()} className='fas fa-times'></span>
            <div className='cardImg'>
                    <img src={props.singPost.image} alt=""/>
            </div>
            <div className='previewInfo mt-1 ml-3'>
                    <h5>{`$${(price / 100).toFixed(2)}`}</h5>
                    <h5>{props.singPost.name}</h5>
                    <h5>{props.singPost.description}</h5>
            </div>
        </div>
    )
  }

  export default ViewProd