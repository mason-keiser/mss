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
                <div id='home' className='navItem' onClick={() => props.setView({ name: 'home', params: {}})}>Home</div>
                <div id='shopAll' className='navItem' onClick={() => props.setView({ name: 'shopAll', params: {}})}>Shop All</div>
                <div id='surf' className='navItem' onClick={() => props.setView({ name: 'surf', params: {}})}>Surf</div>
                <div className='navItem'>Wetsuits</div>
                <div className='navItem'>Accessories</div>       
            </div>
        </div>
    )
}

export default Nav