import React, { useState } from 'react'
import { animateScroll as scroll } from 'react-scroll';

const Nav = (props) => {
    const [searchWord, setSearchWord] = useState();

    const handleSearchSubmit = (callback) => {
        if (!searchWord) {
            document.getElementById('searchBar').placeholder = 'no search word entered'
            return null
        } else if (searchWord.length < 3) {
            document.getElementById('searchBar').value = ''
            document.getElementById('searchBar').placeholder = 'enter more characters'
            return null
        }
        callback(searchWord)
    }

    const handleChange = (event) => {
        setSearchWord(event.target.value)
    }

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
                            <input type="text" placeholder='Search here' onChange={handleChange} id='searchBar'/>
                        </div>
                        <div className='searchBtn' onClick={() => handleSearchSubmit(props.searchItems)}>
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
                <div id='surf' className='navItem' onClick={() => props.setView({ name: 'surf', params: {}})}>Surf</div>
                <div id='wetsuits' className='navItem' onClick={() => props.setView({ name: 'wetsuits', params: {}})}>Wetsuits</div>
                <div id='accessories'className='navItem' onClick={() => props.setView({ name: 'accessories', params: {}})}>Accessories</div>  
                <div id='shopAll' className='navItem' onClick={() => props.setView({ name: 'shopAll', params: {}})}>Shop All</div>     
            </div>
        </div>
    )
}

export default Nav