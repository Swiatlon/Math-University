import React from 'react';
import { Header } from './Home.style';
import { RightSideTextBox } from './Home.style';
import { HomeTitle, HomeSubTitle } from './Home.style';
function Home() {
  return (
    <Header>
      <RightSideTextBox>
        <HomeTitle>Quick Math</HomeTitle>
        <HomeSubTitle>We're here to help you learning!</HomeSubTitle>
      </RightSideTextBox>
    </Header>
  );
}

export default Home;
