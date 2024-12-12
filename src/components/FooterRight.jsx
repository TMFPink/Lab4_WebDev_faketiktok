import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';


import './FooterRight.css';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';

function FooterRight({ likes, comments, saves, shares, profilePic, onMuteToggle, videoUrl }) {

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(false);

  const [muted, setMuted] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleUserAddClick = ()=>{
    setUserAddIcon(faCircleCheck);
    setTimeout(()=>{
      setUserAddIcon(null)
    },3000)
  }

  const parseLikesCount = (count) => {
    if(typeof count === 'string')
    {
      if(count.endsWith('K')) return parseFloat(count) * 1000;
      return parseInt(count)
    }
    return count
  }
  
  const formatLikesCount = (count) => {
    if (count >= 10000) return (count/1000).toFixed(1) + 'K'
    return count;
  }

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked)
  }

  const handleMuteClick = () => {
    setMuted((prevMuted) => !prevMuted);
  }

  const handleSaveClick = () => {
    setSaved((prevSaved) => !prevSaved);
    navigator.clipboard.writeText(videoUrl)
  };

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const closeSharePopup = () => {
    setShowSharePopup(false);
  };

  return (
    <div className='footer-right'>
      <div className='sidebar-icon'>
        {profilePic ? (
          <img src={profilePic} alt="Profile" className='userprofile' style={{width:'45px',height:'45px',color:'#616161'}} />
        ) : null}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{width:'15px',height:'15px',color:'#FF0000'}} onClick={handleUserAddClick}/>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon 
          icon={faHeart}
          style={{width:'35px',height:'35px',color: liked ? '#FF0000' : 'white'}}
          onClick={handleLikeClick}
          />
          <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className='sidebar-icon'>
          <FontAwesomeIcon icon={faCommentDots} style={{width:'35px',height:'35px',color:'white'}}/>
          <p>{comments}</p>
      </div>
      <div className='sidebar-icon'>
        {saved ? (
             <FontAwesomeIcon
             icon={faBookmark}
             style={{width:'35px',height:'35px',color: '#ffc107'}}
             onClick={handleSaveClick}
           />
        ):(
          <FontAwesomeIcon
          icon={faBookmark}
          style={{width:'35px',height:'35px',color: 'white'}}
          onClick={handleSaveClick}/>
        )}
         <p>{saved ? saves + 1: saves}</p>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon 
          icon={faShare} 
          style={{width:'35px',height:'35px', color:'white'}} 
          onClick={handleShareClick}
        />
        <p>{shares}</p>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon 
          icon={muted ? faVolumeMute : faVolumeUp}
          style={{width:'35px',height:'35px', color: 'white'}}
          onClick={() => {
            handleMuteClick();
            onMuteToggle();
          }}
        />
      </div>
      <div className='sidebar-icon record'>
          <img src="https://static.thenounproject.com/png/934821-200.png" alt="Record Icon" />
      </div>

      {showSharePopup && (
        <div className="share-popup">
          <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px gray solid'}}>
            <span>Share options</span>
            <button className="close-button" onClick={closeSharePopup}>X</button>
          </div>
          
          <div className="share-options">
            <div className="share-option">
              <img src="https://img.icons8.com/?size=100&id=13912&format=png&color=000000" alt="" style={{ width: '50px', height: '50px' }}/>
            </div>
            <div className="share-option">
            <img src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000" alt="" style={{ width: '50px', height: '50px' }}/>
            </div>
            <div className="share-option">
            <img src="https://img.icons8.com/?size=100&id=1IYrDBzxNHjL&format=png&color=000000" alt="" style={{ width: '50px', height: '50px' , color:'white'}}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FooterRight;
