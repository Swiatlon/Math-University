import styled from 'styled-components';
// import backgroundImage from 'assets/images/backgroundTest.jpg';
import mediaImage from 'assets/images/backgroundPhone.jpeg';
import pcImage from 'assets/images/backgroundPC.jpg';
import { size } from 'assets/styles/mediaQueries.style';
export const Header = styled.header`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url(${pcImage});
  background-size: cover;
  background-position: center 50%;
  display: grid;
  align-content: center;
  text-align: center;
  font-family: 'Gloria Hallelujah', cursive;
  color: white;
  text-shadow: 6px 1px 4px #0c2f73;
  @media (max-width: ${size.tablet}) {
    background-position: 30% !important;
  }
  @media (max-width: ${size.laptop}) {
    background-image: url(${mediaImage});
    background-size: cover;
    background-position: 50%;
  }
`;
export const HomeTitle = styled.h1`
  font-size: 48px;
`;
export const HomeSubTitle = styled.h2`
  text-decoration: underline black;
  text-underline-offset: 8px;
  line-height: 40px;
  @media (max-width: ${size.laptop}) {
    text-decoration: underline #2f75fc;
  }
`;
