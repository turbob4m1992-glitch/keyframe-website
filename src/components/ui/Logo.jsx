import React from 'react';
// 1. IMPORT the file from the assets folder
import logoUrl from '../../assets/logo.svg';

const Logo = () => {
  return (
    <div className="logo-container">
      {/* 2. Use the variable 'logoUrl' instead of a string path */}
      <img 
        src={logoUrl} 
        alt="Keyframe Kinetic" 
        // Changed to h-32 (128px). Try h-40 or h-[200px] if still too small.
        className="h-40 w-auto" 
      />
    </div>
  );
};

export default Logo;