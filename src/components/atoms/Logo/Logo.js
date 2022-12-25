import React from 'react';
import { LogoImage } from './Logo.style';
import LogoPath from 'assets/images/Logo.png';

function Logo({ className }) {
  return <LogoImage src={LogoPath} alt="logo" className={className} />;
}

export default Logo;
