// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import logoM from '../../assets/meetbees.png'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <div onClick={openMenu} className='profile-button'>
          <img src={logoM} className='logoM'/>
        <div>
          <label className="profile-label">Profile</label>
          {!showMenu && <i className="fa fa-angle-down" aria-hidden="true"></i>}
          {showMenu && <i className="fa fa-angle-up" aria-hidden="true"></i>}
        </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='dropdown-element'>Hello {user.firstName}</div>
          <div className='dropdown-element'>{user.email}</div>
          <div className='dropdown-element'>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
