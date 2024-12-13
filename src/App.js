import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import UserProfile from './components/UserProfile';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPNdUMa6adrZzcEqIbmgWPIAf6e3tTf8WuPQ&s',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://blog.thelinguist.com/wp-content/uploads/2024/09/cover_why-is-duolingo-free-888x592.png.webp',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM8QbgWdZegPwNUZKPDB0urFpYrtgd7tX95g&s',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://i.ytimg.com/vi/QPjgXWm7F6c/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCogcigRMA8=&rs=AOn4CLDYGxieqTsUkvJ3vNY1LDb1gT-3GQ',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  const filteredVideos = videos.filter(video => {
    const hashtags = video.description.match(/#\w+/g) || [];
    
    if (!searchQuery) return true;
    
    return hashtags.some(tag => 
      tag.toLowerCase() === `#${searchQuery.toLowerCase()}`
    );
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, 
    };

    
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  const handleProfileClick = (username, profilePic, url) => {
    setCurrentUser({ username, profilePic, url });
    setShowProfile(true);
  };

  const handleHomeClick = () => {
    setShowProfile(false);
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar setSearchQuery={setSearchQuery} />
        {showProfile ? (
          <UserProfile 
            username={currentUser.username} 
            profilePic={currentUser.profilePic} 
            videoUrl={currentUser.url}
          />
        ) : (
          filteredVideos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === 0}
              onProfileClick={handleProfileClick}
            />
          ))
        )}
        <BottomNavbar onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
  
}

export default App;
