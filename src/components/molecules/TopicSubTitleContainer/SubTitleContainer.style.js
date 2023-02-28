import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const SubTitleContainer = styled.div`
  text-align: left;
  padding-left: 40px;
  line-height: 50px;
  padding-bottom: 42px;
  padding-right: 40px;
  position: relative;
  h3 {
    font-size: 18px;
    padding-top: 26px;
  }
  img {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-bottom: 10px;
  }
  @media (max-width: ${size.tablet}) {
    img {
      width: 100%;
    }
  }
  @media (max-width: ${size.mobileL}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;
