import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const SquareContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 20px;
  justify-content: center;
  justify-items: center;
  position: relative;
  select {
    width: 100%;
    height: 60px;
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
  }
  button {
    padding: 20px 50px;
    margin-bottom: 20px;
    background: white;
    border: 1px solid black;
    font-size: 18px;
    cursor: pointer;
  }
  span {
    border: 1px solid black;
    width: 100%;
    text-align: center;
    background: white;
    padding: 10px 0px;
    margin-bottom: 10px;
    font-size: 18x;
  }
  @media (min-width: ${size.laptopL}) {
    select,
    span {
      width: 80%;
    }
  }
`;
export const SubmitContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  select {
    margin-top: 0px;
    padding-bottom: 1px;
    padding-right: 2px;
    font-size: 18px;
  }
`;
