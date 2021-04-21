import React from 'react'
import { animateScroll as scroll } from 'react-scroll';

const Nav = (props) => {

    return (
        <div className='navbarCont shadow-lg'>
            <div className='topRow'>
                <div className='logoIcon' onClick={() =>  props.setView({ name: 'home', params: {}})}>
                    <img src='/images/icon.png'></img>
                    <h2>Mas's Surf Shop</h2>
                </div>
                <div className='desk'>
                    <div className='inputBtnCont'>
                        <div className='searchInput'>
                            <input type="text" placeholder='Search here' id='searchBar'/>
                        </div>
                        <div className='searchBtn'>
                            <span className='fas fa-search'></span>
                        </div>
                    </div>
                    <div className='cartCont'>
                        <span className='fas fa-shopping-cart'></span>
                        <h4 className=' mt-1'>0</h4>
                    </div>
                </div>
            </div>
            <div className='bottomRow'>
                <div onClick={() => props.setView({ name: 'shopAll', params: {}})}>Shop All</div>
                <div>Surf</div>
                <div>Wetsuits</div>
                <div>Accessories</div>       
            </div>
        </div>
    )
}

export default Nav