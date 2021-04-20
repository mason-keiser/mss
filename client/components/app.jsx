import React from 'react';
import { useState } from 'react';
import HomeCarousel from './carousel';
import Nav from './nav'


const App = () => {

    const [view, setView] = useState({ name: 'home', params: {}})

    const viewTern = (view.name === 'home')
        ? <HomeCarousel/>
        : null

    return (
        <div>
            <Nav setView={setView}/>
            {viewTern}
        </div>
    )
}

export default App