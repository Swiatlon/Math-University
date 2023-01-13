import Submenu from 'components/molecules/Submenu/Submenu';
import React from 'react';
import { useState } from 'react';
import { LiItem, LiBox } from './MenuItem.styled';
import { Link } from 'react-router-dom';
function MenuItem({ items: item, depthLevel, dataUrl }) {
  // REACT ROUTER URL
  const actualPath = dataUrl;
  const routePath = (actualPath ? actualPath + '/' + item.title : item.title)?.replaceAll(/\s/g, '-');
  //Animations
  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    if (window.innerWidth > 1024) setDropdown(true);
  };
  const onMouseLeave = () => {
    if (window.innerWidth > 1024) setDropdown(false);
  };
  const onClick = (e) => {
    e.stopPropagation();
    setDropdown(!dropdown);
  };
  //Content
  const ItemContent = () => {
    return item.submenu ? (
      <>
        {item.title}
        <Submenu depthLevel={depthLevel} submenu={item.submenu} dropdown={dropdown} routePath={routePath} />
      </>
    ) : (
      item.title
    );
  };

  return depthLevel === -1 ? (
    //First elements
    <LiBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <LiItem onClick={onClick}>{ItemContent()}</LiItem>
    </LiBox>
  ) : item.submenu ? (
    //Menu Dropdowns
    <LiItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      {ItemContent()}
    </LiItem>
  ) : (
    //Menu Links (last element without dropdown)
    <LiItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} data-routepath={routePath}>
      <Link to={routePath}>{ItemContent()}</Link>
    </LiItem>
  );
}

export default MenuItem;
