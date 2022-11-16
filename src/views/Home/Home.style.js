import styled from 'styled-components';
import backgroundImage from 'assets/images/backgroundTest.jpg';

export const Header = styled.header`
  background-image: url(${backgroundImage});
  background-size: 80%;
  background-position: left bottom;
  background-repeat: no-repeat;
  font-family: 'Gloria Hallelujah', cursive;
`;
export const RightSideTextBox = styled.div`
  width: 50vw;
  margin-left: auto;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const HomeTitle = styled.h1`
  font-weight: 400;
  font-size: 60px;
`;
export const HomeSubTitle = styled.h2`
  font-weight: 400;
  font-size: 30px;
`;
