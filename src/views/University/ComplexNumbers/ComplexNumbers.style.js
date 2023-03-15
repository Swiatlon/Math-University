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
