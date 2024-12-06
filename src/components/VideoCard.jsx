import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {

    const {url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay} = props
    const videoRef = useRef(null)
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);

    // useEffect(()=>{
    //   if (autoplay) {
    //       videoRef.current.play()
    //   }
    // },[autoplay]);

    const onVideoPress = () => {
        if (!isDragging) 
        {
          if (videoRef.current.paused) 
          {
            videoRef.current.play();
          } 
          else 
          {
            videoRef.current.pause();
          }
        }
    };

    const handleMuteToggle = () => {
      setIsMuted(prev => !prev);
      if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    }

    const mouseDown = (e) => {
        setIsDragging(true);
        setStartY(e.clientY);
    };

    const Move = (e) => {
        if (isDragging) {
            const deltaY = e.clientY - startY;
            if (Math.abs(deltaY) > 10) {
                handleScroll(deltaY);
                setIsDragging(false);
            }
        }
    };

    const handleScroll = (deltaY) => {
        const container = document.querySelector('.container');
        const currentScroll = container.scrollTop;
        const videoHeight = container.clientHeight;

        if (deltaY > 0) {
            scrollContainer(container, currentScroll - videoHeight);
        } else {
            scrollContainer(container, currentScroll + videoHeight);
        }
    };

    const scrollContainer = (container, scrollTo) => {
        container.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    };

    const mouseUp = () => {
        setIsDragging(false);
    };

  return (
    <div className='video' 
         onMouseDown={mouseDown} 
         onMouseMove={Move} 
         onMouseUp={mouseUp} 
         onMouseLeave={mouseUp} 
    >
      <video 
        className='player'
        onClick={onVideoPress}
        ref={(ref)=>{
          videoRef.current = ref
          setVideoRef(ref)
        }}
        loop
        src={url}
      ></video>
      <div className='bottom-controls'>
        <div className='footer-left'>
          <FooterLeft username={username} description={description} song={song}/>
        </div>
        <div className='footer-right'>
          <FooterRight 
            likes={likes} 
            shares={shares} 
            comments={comments} 
            saves={saves} 
            profilePic={profilePic} 
            onMuteToggle={handleMuteToggle}
            videoUrl={url}
          />
        </div>
      </div>

    </div>
  );
};

export default VideoCard;
