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


  const Wetsuits = (props) => {

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const items = (props.wetsuitProducts !== null && props.wetsuitProducts !== undefined) 
    ?  (props.wetsuitProducts.map((product, index) => {
            return(
                <div className='m-auto'  key={index}>
                    <div className='singPost'>
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
                <h1>Wetsuits</h1>
            </div>
            <Row className='row-cols-lg-3'>
                {items}
            </Row>
            <div className='toTop' onClick={() => scroll.scrollToTop()}>
                <div className='fas fa-chevron-up' style={{color: 'white'}}></div>    
            </div> 
        </div>
    )
  }

  export default Wetsuits