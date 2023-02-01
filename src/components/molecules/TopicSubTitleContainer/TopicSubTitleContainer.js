import { SubTitleContainer } from './SubTitleContainer.style';
import { TopicSubTitle } from '../../atoms/TopicSubTitle/TopicSubTitle.style';
import { SubTitleToggleButton } from '../../atoms/SubTitleToggleButton/SubTitleButton.style';
import { useState } from 'react';
import React from 'react';

function TopicSubTitleContainer({ children, subTitle: title }) {
  const initialState = title !== 'Opis tematu:' ? true : false;
  const [hide, setHide] = useState(initialState);
  return (
    <SubTitleContainer>
      <TopicSubTitle>{title}</TopicSubTitle>
      <SubTitleToggleButton
        onClick={() => {
          setHide(!hide);
        }}
      >
        {hide === true ? '+' : '-'}
      </SubTitleToggleButton>
      <div className={hide ? 'hide' : 'show'}>{children}</div>
    </SubTitleContainer>
  );
}

export default TopicSubTitleContainer;
