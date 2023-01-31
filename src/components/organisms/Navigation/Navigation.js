import React, { useEffect, useRef } from 'react';
import { Menu } from './Navigation.style';
import { menuArch } from 'data/MenuArch/MenuArch';
import MenuItem from 'components/atoms/MenuItem/MenuItem';
import { Nav } from './Navigation.style';
import Logo from 'components/atoms/Logo/Logo';
import { Icon } from 'components/atoms/Icon/Icon.style';
import hamburgerImage from 'assets/images/icons/hamburger.svg';
import { useState } from 'react';

function Navigation() {
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    if (hidden === false) {
      menuRef.current.scrollTo(0, 0);
    }
  }, [hidden]);
  return (
    <Nav className={hidden ? 'navShow' : 'navHide'} ref={menuRef}>
      <Menu>
        {menuArch.map((item, index) => {
          const depthLevel = -1;
          const typeOfItem = item.typeOfItem ? item.typeOfItem : '';
          const ItemContent = () => {
            if (typeOfItem === 'image') {
              return (
                <div className="logo-container" key={index}>
                  <Logo className="logo" />
                </div>
              );
            } else if (typeOfItem === 'icon') {
              return (
                <Icon
                  src={hamburgerImage}
                  alt={item.title}
                  className="hamburger"
                  key={index}
                  onClick={function () {
                    setHidden(!hidden);
                  }}
                />
              );
            } else {
              //First Menu need to have div as parent of li elements
              return <MenuItem items={item} key={index} depthLevel={depthLevel}></MenuItem>;
            }
          };
          return ItemContent();
        })}
      </Menu>
    </Nav>
  );
}

export default Navigation;
