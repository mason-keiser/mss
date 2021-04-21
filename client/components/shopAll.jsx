import React from 'react'
import ItemCard from './itemCard'
import {
    Row,
    Col
  } from 'reactstrap';

const ShopAll = (props) => {

    const items = (props.allProducts !== null && props.allProducts !== undefined) 
    ?  (props.allProducts.map((product, index) => {
            return(
                <div className='m-auto'  key={index}>
                    <div className='singPost'>
                        <ItemCard
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
                <h1>Shop All</h1>
            </div>
            <Row className='row-cols-lg-3'>
                {items}
            </Row>
        </div>
    )
}

export default ShopAll