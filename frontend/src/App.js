import React, { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import 'mdbreact/dist/css/mdb.css';


import Home from './Product/pages/Index';
import UpdateProfile from './User/pages/UpdateProfile';
import Cart from './Product/pages/Cart';
import Aboutus from './Product/pages/AboutUs'
import CourseDetails from './Product/pages/CourseDetails'
import Login from './User/pages/Login';
import Register from './User/pages/Register';
import Footer from './Shared/components/Footer';

import PaidCourse from './onSuccesspaymnet/pages/PaidCourse';
import TitleSpecificLecture from './onSuccesspaymnet/pages/TitleSpecificLecture';

import Navbar from './Shared/components/mainNavigation';
import { AuthContext } from './Shared/context/auth-context'; 


import Test from './Shared/test';

//IMPORT CSS
import './App.css';




const App = () => {
  const [token,setToken]=useState(false);
  const [userId,setUserId]=useState(false);
  const [email,setEmail]=useState(false);

  const login=useCallback((uid, token,email) => {
    setToken(token)
    setUserId(uid)
    setEmail(email)
    // const tokenExpirationDate=expirationDate || new Date(new Date().getTime()+1000*60*60)
    localStorage.setItem(
      'userData',
      JSON.stringify({userId:uid,token:token,email:email}) //expiration:tokenExpirationDate.toISOString()}
    )
  },[]);

  const logout=useCallback(() => {
    setToken(null)
    setUserId(null)
    setEmail(null)
    localStorage.removeItem('userData')
  },[]);

  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token ){//new Date(storedData.expiration)>new Date()
      login(storedData.userId ,storedData.token,storedData.email)//new Date(storedData.expiration)
    }
  },[login])

  let routes;

  if(token){
    routes=(
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
       <Route path="/profile" exact>
          <UpdateProfile />
       </Route>
       <Route path="/cart" exact>
             <Cart />
       </Route>
       <Route path="/about-us" exact>
            <Aboutus />
       </Route>
       <Route path="/course-detail/:title/:id" exact>
            <CourseDetails />
       </Route>
      <Redirect to="/" />
    </Switch>)
  }
  else{
    routes=(<Switch>
          <Route path="/" exact>
                <Test />
          </Route>
          <Route path="/about-us" exact>
            <Aboutus />
          </Route>
          <Route path="/user-login" exact>
            <Login />
          </Route>
          <Route path="/user-register" exact>
            <Register />
          </Route>
          <Route path="/course-detail/:title/:id" exact>
            <CourseDetails />
          </Route>
          <Route path="/mycourse" exact>
            <PaidCourse />
          </Route>
          <Route path="/mycourse/:courseContentId" exact>
            <TitleSpecificLecture />
          </Route>
          <Redirect to="/mycourse/title" />
    </Switch>)
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: !!token, token:token, userId:userId, email:email, login: login, logout: logout}}>
      <Router>
        {/* <Navbar mobile={false}/> */}
        {routes}
        {/* <Footer /> */}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
