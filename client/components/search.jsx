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


  const Searched = (props) => {

    useEffect(() => {
        scroll.scrollToTop();
    },[])

    const items = (props.searchItems[0]) 
    ?  (props.searchItems.map((product, index) => {
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
    : <h3 style={{ textAlign: 'center'}}>No items fit that search term</h3>

    const border = (!props.searchItems[0]) 
    ? <h6 className='m-4 p-2' style={{ textAlign: 'center', borderTop: '1px solid black'}}>no search items available </h6>
    : <h6 className='m-4 p-2' style={{ textAlign: 'center', borderTop: '1px solid black'}}>no other search results</h6>


    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>Search Results</h1>
            </div>
            <Row className='row-cols-lg-3 m-0'>
                {items}
            </Row>
            {border}
            <div className='toTop' onClick={() => scroll.scrollToTop()}>
                <div className='fas fa-chevron-up' style={{color: 'white'}}></div>    
            </div> 
        </div>
    )
  }

  export default Searched