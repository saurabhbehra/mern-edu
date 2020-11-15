import React from 'react'
import {NavLink} from 'react-router-dom';

//IMPORT CSS
import './mobileNav.css' 


const mobileNav=()=> {
    const openNav=() =>{
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.display = 'none';
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      }
      
      const closeNav=()=> {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.display = 'block';
        document.body.style.backgroundColor = "white";
      }
    return (
        <React.Fragment>
             <div id="mySidenav" className="sidenav">
                <label className="closebtn" onClick={closeNav}>×</label>
                <NavLink to="/profile" onClick={closeNav}>Profile</NavLink>
                <NavLink to="/cart" onClick={closeNav}>Cart</NavLink>
                <NavLink to="/about-us" onClick={closeNav}>About Us</NavLink>
                <NavLink to="user-register" onClick={closeNav}>Sign Up</NavLink>
                <NavLink to="/user-login" onClick={closeNav}>Sign In</NavLink>
            </div>
            <div id="main">
                <span style={{ fontSize: 30, cursor: "pointer",marginleft:2 }} onClick={openNav}> ☰ </span>
               <NavLink to="/" exact><span style={{ fontSize: 30, cursor: "pointer" ,float:"right",marginRight:5}} > Logo </span></NavLink>
            </div>
        </React.Fragment>
    )   
}

export default mobileNav
