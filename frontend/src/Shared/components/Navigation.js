import React,  { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
//IMPORT CSS
import './Navigation.css'


const Navigation=()=> {
  
   const auth=useContext(AuthContext);

return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-default fixed-top">
     <div className="container-fluid">
     <NavLink to="/" className="navbar-brand" exact>Logo </NavLink>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control header-form mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn my-2 my-sm-0 header-form header-but" type="submit">Search</button>
      </form>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {  auth.isLoggedIn &&
            <li className="nav-item active">
              <NavLink to="/profile" className="nav-link"><div className="header-link">Profile</div></NavLink>
            </li>
          }
           {  auth.isLoggedIn &&
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link" href="#"><div className="header-link">Cart</div></NavLink>
            </li>
            }
          <li className="nav-item">
            <NavLink to="/about-us" className="nav-link" href="#"><div className="header-link">About Us</div></NavLink>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="header-link">Account</div>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            { !auth.isLoggedIn &&
              <NavLink to="/user-register" className="dropdown-item">
                Sign Up
              </NavLink>
            }
            { !auth.isLoggedIn &&
              <NavLink to="/user-login" className="dropdown-item">
                Sign In
              </NavLink>
             }
             { auth.isLoggedIn &&
              <button onClick={auth.logout} className="dropdown-item">
                Log Out
              </button>
             }
            </div>
          </li>
        </ul>
      </div>
     </div>
    </nav>
  )
}

export default Navigation
