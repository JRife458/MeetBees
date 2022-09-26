import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import logo from '../../assets/meetbeesLOGO.png';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='nav-links'>
          <LoginFormModal />
          <NavLink to="/signup">
            <button>Sign Up</button>
          </NavLink>
        </div>
      </>
    );
  }

  return (
      <div className='navigation'>
        <NavLink exact to="/">
          <img src={logo} className='logo' />
        </NavLink>
        <div>
        {isLoaded && sessionLinks}
        </div>
      </div>
  );
}

export default Navigation;
