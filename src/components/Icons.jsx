import React from 'react';
import icons from '../../assets/icons';

const Icon = ({ icon, color }) => (
      <svg width="1em" height="1em" viewBox="0 0 16 16" className={`bi bi-${icon}`} fill={color || 'currentColor'}
           xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d={icons[icon].path}/>
      </svg>
);

export default Icon;
