import React from 'react'

import Mobilenav from './mobileNav';
import Navigation from './Navigation';

//IMPORT CSS 
import './mainNavigation.css';

const mainNavigation=(props)=> {
    let mobileClassName=props.mobile?'':'mobile-header';
    let desktopClassName=props.mobile?'':'desktop-header';
    return (
        <React.Fragment>
            <div className={desktopClassName}>
                <Navigation/>
            </div>
            <div className={mobileClassName}>
               <Mobilenav/>
            </div>
        </React.Fragment>
    )   
}

export default mainNavigation
