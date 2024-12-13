import React from 'react';
import './UserProfile.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons/faMessage';

const UserProfile = ({ username, profilePic,videoUrl }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={profilePic} alt={`${username}'s profile`} className="profile-pic" />
        <div className="profile-info">
          <h2 className="username">@{username}</h2>
        </div>
      </div>
      <div className='profile-stat'>
        <div className='stat'>
            <span>xx</span>
            <div>Following</div>
        </div>
        <div className='stat'>
            <span>xx</span>
            <div>Followers</div>
        </div>
        <div className='stat'>
            <span>xx</span>
            <div>Likes</div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="follow-button">Follow</button>
        <FontAwesomeIcon icon={faMessage} className='message-button'/>
      </div>
      <div className='profile-desc'>
        <div>Some description.......</div>
      </div>
      <div className='profile-vid-list'>
      <video 
        className='profile-vid'
        loop
        muted
        src={videoUrl}
      ></video>
      </div>
    </div>
  );
};

export default UserProfile;