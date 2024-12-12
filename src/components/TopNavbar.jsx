import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ setSearchQuery }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');

  const performSearch = () => {
    setSearchVisible(false);
    setSearchQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const openSearch = () => {
    setSearchVisible(true);
  };

  return (
    <div className='top-navbar'>
      {!searchVisible && (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faTv} className='icon' />
          <h2>Following | <span>For You</span></h2>
          <FontAwesomeIcon icon={faSearch} className='icon' onClick={openSearch} />
        </div>
      )}
      {searchVisible && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search by hashtag..."
            autoFocus
          />
          <FontAwesomeIcon icon={faSearch} className='icon' onClick={performSearch} />
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
