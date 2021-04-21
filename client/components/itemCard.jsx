import React from 'react';

const ItemCard = (props) => {

    const price = Number(props.product.price)

    return (
        <div>
            <div className='productCard'>
                <div className='cardImg'>
                    <img src={props.product.image} alt=""/>
                </div>
                <div className='previewInfo mt-1 ml-3'>
                    <h5>{`$${(price / 100).toFixed(2)}`}</h5>
                    <h5>{props.product.name}</h5>
                </div>
            </div>
        </div>
    )
}

export default ItemCard