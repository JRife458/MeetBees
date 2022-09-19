import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from '../../assets/meetup-logo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-links'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <div className='nav-links'>
          <LoginFormModal />
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </>
    );
  }

  return (
      <div className='navigation'>
        <div className='nav-links'>
        <NavLink exact to="/">
          <img src={logo} className='logo' />
        </NavLink>
        </div>
        <div>
        {isLoaded && sessionLinks}
        </div>
      </div>
  );
}

export default Navigation;
