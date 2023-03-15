import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const InputNumberStyled = styled.input`
  width: 100%;
  height: 100%;
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;
  @media (max-width: ${size.tablet}) {
    font-size: 18px;
  }
`;
export const UnitsBox = styled.div`
  width: 100%;
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px !important;
  padding: 1px 4px;
  select {
    position: absolute;
    z-index: 100;
    height: 100%;
    max-width: 70px;
    font-size: 18px;
    padding-left: 5px;
    right: 0;
    margin-top: 0px !important;
  }
  @media (min-width: ${size.laptopL}) {
    width: 80%;
  }
`;
