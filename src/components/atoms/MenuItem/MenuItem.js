import Submenu from 'components/molecules/Submenu/Submenu';
import React from 'react';
import { useState } from 'react';
import { LiItem, LiBox } from './MenuItem.styled';
function MenuItem({ items: item, depthLevel }) {
  //Animations
  const [dropdown, setDropdown] = useState(false);
  const onMouseEnter = () => {
    if (window.innerWidth > 1024) setDropdown(true);
  };
  const onMouseLeave = () => {
    if (window.innerWidth > 1024) setDropdown(false);
  };
  const onClick = (e) => {
    console.log(e.target);
    e.stopPropagation();
    setDropdown(!dropdown);
  };
  //Content
  const ItemContent = () => {
    return item.submenu ? (
      <>
        {item.title}
        <Submenu depthLevel={depthLevel} submenu={item.submenu} dropdown={dropdown} />
      </>
    ) : (
      item.title
    );
  };

  return depthLevel === -1 ? (
    <LiBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <LiItem onClick={onClick}>{ItemContent()}</LiItem>
    </LiBox>
  ) : (
    <LiItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
      {ItemContent()}
    </LiItem>
  );
}

export default MenuItem;
