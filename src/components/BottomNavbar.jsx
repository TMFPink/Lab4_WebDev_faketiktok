import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7,faUser } from '@fortawesome/free-solid-svg-icons';

function BottomNavbar({ onHomeClick }) {
  return (
    <div className='bottom-navbar'>
      <div className='nav-item' onClick={onHomeClick}>
        <FontAwesomeIcon icon={faHouse} className='icon'/>
        <span className="item-name active">Home</span>
      </div>
      <div className='nav-item'>
        <FontAwesomeIcon icon={faUserFriends} className='icon'/>
        <span className="item-name">Friends</span>
      </div>
      <div className='nav-item'>
        <FontAwesomeIcon icon={faPlus} className='icon plus'/>
        <span className="item-name">Post</span>
      </div>
      <div className='nav-item'>
        <FontAwesomeIcon icon={faInbox} className='icon'/>
        <span className="item-name">Inbox</span>
      </div>
      <div className='nav-item'>
        <FontAwesomeIcon icon={faUser} className='icon'/>
        <span className="item-name">Profile</span>
      </div>
    </div>

    
  );
}

export default BottomNavbar;
