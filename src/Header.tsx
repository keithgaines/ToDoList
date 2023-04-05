import React, { useState } from 'react';
import './Themes.css'

// Import the SVG images for light and dark modes
import sunIcon from './icons/icon-sun.svg';
import moonIcon from './icons/icon-moon.svg';

interface HeaderProps {
  theme: string;
  onThemeChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const [isLightMode, setIsLightMode] = useState(theme === 'light');

  const handleThemeChange = () => {
    setIsLightMode(!isLightMode);
    onThemeChange();
  };

  return (
    <header>
      <h1>TO DO</h1>
      <div className='themebutton'>
      <button onClick={handleThemeChange}>
        {isLightMode ? (
          <img src={moonIcon} alt="Dark mode" />
        ) : (
          <img src={sunIcon} alt="Light mode" />
        )}
      </button>
      </div>
    </header>
  );
};

export default Header;
