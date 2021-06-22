import React, {useState, useEffect} from 'react';
import './Navbar.css';
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../actions/userActions'
import {openModals} from '../../actions/modalActions'
const Navbar = () => {
  
   
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin;
  const match = useRouteMatch();
 
  
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history)
    
   console.log(userInfo)

   const logoutHandler = () => {
    dispatch(logout())
    history.push('/login')
  }

  const openModal = ()=> {
    dispatch((openModals()))
  }
  const isActive = (route) => {
       console.log(history.location.pathname)
      return history.location.pathname === route
  }

  //  useEffect(()=> {
  //    if(userInfo){
  //      history.push('/mine')
  //    }else {
  //      history.push('/')
  //    }
  //  },[])
 
  
    return (
      <>
        <nav class="navbar navbar-expand-lg navbar-dark bg-warning">
        <Link class="navbar-brand" to="/">Color Game</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto pr-2">
            {!userInfo ? <>
            <li class={`nav-item  pr-4 active=${isActive('/')}`}>
              <Link class="nav-link" to="/">Home</Link>
            </li><li class="nav-item pr-4">
              <Link class="nav-link" to="/login">Login</Link>
            </li> 
            </>
            :<><li class={`nav-item  pr-4 ${isActive('/mine') ? "active":""}`}>
            <Link class="nav-link" to="/mine">Mine</Link>
          </li><li class={`nav-item  pr-4 ${isActive('/play') ? "active":""}`}>
              <Link class="nav-link" to="/play">Play</Link>
            </li>
            <li class={`nav-item  pr-4 ${isActive('/recharge') ? "active":""}`}>
              <Link class="nav-link" to="/recharge">Recharge</Link>
            </li>

            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {userInfo ? userInfo.user.email: 'Hello'}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <button type="button" class="dropdown-item"  data-target="#exampleModal" onClick={openModal}>Change NickName</button>
          <a class="dropdown-item" href="#">Add Bank Details</a>
          <div class="dropdown-divider"></div>
          <li class="nav-item pr-4">
              <a class="dropdown-item" href="#" onClick={logoutHandler}>Logout</a>
            </li>
        </div>
      </li>
         
            
            </>
            
            }
            
           
           
          </ul>
        </div>
      </nav>
   


</>

    )
}

export default Navbar
