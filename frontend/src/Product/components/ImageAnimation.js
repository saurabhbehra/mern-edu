import React from 'react'

import anime from '../images/bg18.png';
import laptopGirl from '../images/girllaptop.png';


//IMPORT CSS
import './imageAnimation.css'

const ImageAnimation=()=> {
    return (
        <div>
           <img src={anime} className="anime" alt="anime"/>
           <img src={laptopGirl} className="girl" alt="girl"/>
        </div>
    )
}

export default ImageAnimation
