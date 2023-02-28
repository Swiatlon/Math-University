import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const TopicCenterDiv = styled.div`
  box-shadow: 7px 7px 2px 0px rgb(0 0 0 / 75%);
  position: relative;
  margin-top: 10rem;
  min-height: 80vh;
  padding-bottom: 40px;
  background-size: 30px 30px;
  border: 1px solid lightblue;
  background-image: linear-gradient(90deg, rgba(173, 216, 230, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(173, 216, 230, 1) 1px, white 1px);
  width: 35vw;
  @media (max-width: ${size.laptopL}) {
    width: 50vw;
  }
  @media (max-width: ${size.laptop}) {
    width: 70vw;
  }
  @media (max-width: ${size.mobileL}) {
    width: 90vw;
  }
  @media (max-width: ${size.tablet}) {
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  } ;
`;
