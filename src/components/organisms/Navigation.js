import React from 'react';
import { NavigationWrapper, NavItem, Logo } from './Navigation.style';
import LogoImage from 'assets/images/Logo.png';

function Navigation() {
  return (
    <NavigationWrapper>
      <>
        <NavItem>O nas</NavItem>
        <NavItem>Informatyka</NavItem>
      </>
      <Logo src={LogoImage}></Logo>
      <>
        <NavItem>Poziom Wykształcenia</NavItem>
        <NavItem>Kontakt</NavItem>
      </>
    </NavigationWrapper>
  );
}

export default Navigation;
