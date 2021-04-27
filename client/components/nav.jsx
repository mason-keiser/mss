import React, { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll';

const Nav = (props) => {
    const [searchWord, setSearchWord] = useState();

    const handleSearchSubmit = (callback) => {
        const bar = document.getElementById('searchBar')
        if (!searchWord) {
            bar.value = ''
            bar.style.border = '1px solid red'
            bar.placeholder = 'no search term entered'
            return null
        } else if (searchWord.length < 3) {
            bar.value = ''
            bar.style.border = '1px solid red'
            bar.placeholder = 'enter min 3 characters'
            return null
        }
        bar.style.background='white'
        bar.style.border = 'none'
        callback(searchWord)
    }

    const handleChange = (event) => {
        setSearchWord(event.target.value)
    }

    const homeNdClear = () => {
        const bar = document.getElementById('searchBar');
        bar.value = ''
        bar.style.border = 'none'
        bar.placeholder = 'Search here'
        props.setView({ name: 'home', params: {}})
    }

    const cartLength = (!props.cartItems) ? 0 : props.cartItems.length

    return (
        <div className='navbarCont shadow-lg'>
            <div className='topRow'>
                <div className='logoIcon' onClick={() =>  homeNdClear()}>
                    <img src='/images/icon.png'></img>
                    <h2>Mas' Surf Shop</h2>
                </div>
                <div className='desk'>
                    <div className='inputBtnCont'>
                        <div className='searchInput'>
                            <input type="text" placeholder='Search here' onChange={handleChange} id='searchBar'/>
                        </div>
                        <div className='searchBtn' onClick={() => handleSearchSubmit(props.searchItems)}>
                            <span className='fas fa-search'></span>
                        </div>
                    </div>
                    <div className='cartCont' onClick={() => props.setView({ name: 'cart', params: {}})}>
                        <span className='fas fa-shopping-cart'></span>
                        <h4 className=' mt-1'>{cartLength}</h4>
                    </div>
                </div>
            </div>
            <div className='bottomRow'>
                <div id='home' className='navItem' onClick={() => homeNdClear()}>Home</div>
                <div id='surf' className='navItem' onClick={() => props.setView({ name: 'surf', params: {}})}>Surf</div>
                <div id='wetsuits' className='navItem' onClick={() => props.setView({ name: 'wetsuits', params: {}})}>Wetsuits</div>
                <div id='accessories'className='navItem' onClick={() => props.setView({ name: 'accessories', params: {}})}>Accessories</div>  
                <div id='shopAll' className='navItem' onClick={() => props.setView({ name: 'shopAll', params: {}})}>Shop All</div>     
            </div>
        </div>
    )
}

export default Nav