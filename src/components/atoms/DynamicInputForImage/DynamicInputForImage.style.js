import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const DynamicInputBox = styled.div`
  position: absolute;
  left: ${(props) => props.children.props.x}px;
  top: ${(props) => props.children.props.y}px;
  input {
    max-width: 70px;
    padding: 5px 0px;
    text-align: center;
    font-size: 18px;
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    z-index: 100;
  }
  input:focus {
    border: 1px solid yellow;
    background: white;
  }
  @media (max-width: ${size.tablet}) {
    input {
      font-size: 16px;
      max-width: 30px;
    }
  }
`;
