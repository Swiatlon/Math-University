import { size } from 'assets/styles/mediaQueries.style';
import styled from 'styled-components';

export const ComplexNumberInput = styled.input`
  width: 100%;
  height: 60px;
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;
  @media (max-width: ${size.tablet}) {
    font-size: 18px;
  }
`;

export const ComplexNumbersCoordinate = styled.canvas`
  margin-left: auto;
  margin-right: auto;
  display: flex;
`;

export const ComplexNumbersTable = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  color: black;
  font-size: 16px;
  div {
    display: grid;
    padding: 15px;
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-right: 1px solid black;
    grid-template-columns: 40% auto;
    background: linear-gradient(-225deg, #e5edfb 0%, #79aad3 100%);
    font-weight: bold;
    justify-items: center;
    text-align: center;
  }
  p {
    background: white;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    border: 1px solid black;
    width: 60%;
  }
  @media (max-width: ${size.tablet}) {
    div {
      grid-template-columns: 1fr;
    }
    p {
      margin-top: 5px;
    }
  }
`;
