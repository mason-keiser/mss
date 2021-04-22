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


  const Searched = (props) => {

    const items = (props.searchItems !== null && props.searchItems!== undefined) 
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
    : null

    return (
        <div className='container'>
            <div className='pageTitle'>
                <h1>Search Results</h1>
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

  export default Searched