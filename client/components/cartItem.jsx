import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CartItem = (props) => {
    const [cartIqty, setCartIQty] = useState(props.product.quantity)

    const price = Number(props.product.price) 
    const subtotal = price * cartIqty


    const setItemProd = () => {
        props.setSingPost(props.product)
        props.setView({ name: 'viewprod', params: {}})
    }

    const qtyHandler = (event) => {
        if (event.target.id === 'd') {
            if (cartIqty <= 0) {
                return null
            } else {
                setCartIQty(cartIqty - 1)
            }
        } else {
            if (cartIqty >= 9) {
                return null    
            } else  {
                setCartIQty(cartIqty + 1)
            }
        }
    }

    const id = {
        cartItemId: props.product.cartItemId
    }

    return (
        <div>
            <span onClick={() => props.deleteCartItem(id)} className='fas fa-times mt-3 ml-3 del'></span>
            <div className='productCard cartCard' style={{ height: '100%'}}>
                <div className='cardImg'>
                    <img src={props.product.image} alt=""/>
                </div>
                <div className='previewInfo mt-1 ml-3'>
                    <h5>{`$${(price / 100).toFixed(2)}`}</h5>
                    <h5>{props.product.name}</h5>
                </div>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <div className='d-flex flex-row ml-3 pb-3 mt-3'>
                        <div onClick={() => qtyHandler(event)} id='d' className='d-flex incBtns fas fa-minus'></div>
                        <div className='qtyView'>{cartIqty}</div>
                        <div onClick={() => qtyHandler(event)} id='i' className='d-flex incBtns fas fa-plus'></div>
                    </div>
                    <div className='updateBtn mr-3'>Update</div>
                </div>
                <div className='ml-3 pb-3 mt-1'>
                    <h5 className='subtotal' name={props.product.cartItemId} id={subtotal}>Subtotal :</h5>
                    <h5>{`$${(subtotal / 100).toFixed(2)}`}</h5>
                </div>
            </div>
        </div>
    )
}

export default CartItem