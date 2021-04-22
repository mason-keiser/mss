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
            props.setSingPost('')
        } else if (props.singPost.itemtype === 2) {
            props.setView({ name: 'wetsuits', params: {}})
            props.setSingPost('')
        } else if (props.singPost.itemtype === 3) {
            props.setView({ name: 'accessories', params: {}})
            props.setSingPost('')
        }
    }

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const price = Number(props.singPost.price)

    return (
        <div className='itemContainer'>
            <span onClick={() => close()} className='fas fa-times'></span>
            <div className='cardImg' id='imgCo'>
                    <img src={props.singPost.image} id='zoomImg' alt=""/>
            </div>
            <div className='previewInfo mt-1 ml-3'>
                    <h5>{`$${(price / 100).toFixed(2)}`}</h5>
                    <h4>{props.singPost.name}</h4>
                    <div>
                        <div className='quantityBtn mt-2'>
                            <h6>Qty:
                                <select name="" id="selectQty">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </h6>
                        </div>
                    </div>
                    <h5 className='mt-4'>Description: </h5>
                    <h5 className='mt-2'>{props.singPost.description}</h5>
            </div>
        </div>
    )
  }

  export default ViewProd