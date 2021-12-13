import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';

/**
* @author Chandan Kumar
* @function Header
**/

const Header = (props) => {
  let isAuthenticated=props.isAuthenticated;

  var name=null;

  if (isAuthenticated)
    name = props.loggedInUser.name;

  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <div className="logo">EPAM Messenger</div>
          {
            !isAuthenticated ?
            <ul className="leftMenu">
              <li><NavLink to={'/login'}>Login</NavLink></li>
              <li><NavLink to={'/signup'}>Sign up</NavLink></li>
            </ul> : null
          }
        </div>
          <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
            {isAuthenticated ? `Hi ${name}` : ''}
            </div>
        <ul className="menu">
          {
            isAuthenticated ? 
            <li>
                <Link to={'/logout'} onClick={props.logout}>Logout</Link>
            </li> : null
          }
        </ul>
    </header>
   )

 }

const mapStateToProps=({auth})=>{
  return {
      loggedInUser: auth.user,
      isAuthenticated: auth.isAuthenticated
}}

export default connect(mapStateToProps)(Header);