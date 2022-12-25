import React from 'react';
import MenuItem from 'components/atoms/MenuItem/MenuItem';
import { SubMenuStyled } from './Submenu.style';

function Submenu({ submenu, depthLevel, dropdown }) {
  depthLevel = depthLevel + 1;
  let classValue = '';
  dropdown ? (classValue = 'show') : (classValue = 'hide');
  depthLevel === 0 ? (classValue += ' firstSubMenu') : (classValue = classValue);
  return (
    <SubMenuStyled className={classValue} depthLevel={depthLevel}>
      {submenu.map((submenu, index) => (
        <MenuItem items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </SubMenuStyled>
  );
}

export default Submenu;
