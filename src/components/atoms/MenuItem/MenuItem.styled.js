import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const LiBox = styled.div`
  height: 50%;
  display: flex;
  margin-top: auto;
  position: relative;
  && > li {
    padding: 0px;
    border: none;
  }
  @media (max-width: ${size.laptop}) {
    margin-top: 0;
    height: auto;
    width: 100%;
    position: relative;
  }
`;
export const LiItem = styled.li`
  //style for PC
  left: 0;
  position: relative;
  text-shadow: 4px 0px 4px rgba(0, 0, 0, 0.54);
  text-align: left !important;
  width: 100%;
  margin-right: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid black;
  display: block;
  font-size: 16px;
  text-indent: 10px;
  && li:last-child {
    border-bottom: none;
  }
  @media (max-width: ${size.laptop}) {
    // MEDIA AND LAPTOPS
    width: 100%;
    text-align: center !important;
    text-indent: 0px;
    margin-right: 0px;
    border: none;
    height: 40px;
  }
`;
