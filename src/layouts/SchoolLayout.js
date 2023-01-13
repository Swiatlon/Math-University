import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopicContainer } from 'components/organisms/TopicContainer/TopicContainer.style';
import { TopicCenterDiv } from 'components/molecules/TopicCenterDiv/TopicCenterDiv.style';

function UniversityLayout() {
  return (
    <>
      <TopicContainer>
        <TopicCenterDiv>
          <Outlet></Outlet>
        </TopicCenterDiv>
      </TopicContainer>
    </>
  );
}

export default UniversityLayout;
