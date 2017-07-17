import React from 'react';
import admiral from '../admiral.jpg';

export default () => {
  return (
    <div className='app-header'>
        <img src={admiral} alt='logo' className='header-image'/>
        <h1>"IT'S A TR-APP!"</h1>
        <h3>REACT APP PROVIDING INFORMATION ON STAR WARS PLANETS</h3>
    </div>
  );
}
