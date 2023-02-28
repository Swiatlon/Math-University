import React from 'react';
import { LogoImage } from './Logo.style';
import LogoPath from 'assets/images/Logo.png';
import { useNavigate } from 'react-router';

function Logo({ className }) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = ``;
    navigate(path);
  };
  return <LogoImage src={LogoPath} alt="logo" className={className} onClick={routeChange} />;
}

export default Logo;
