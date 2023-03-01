import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const FieldsBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  grid-gap: 15px;
`;

export const FieldBox = styled.div`
  width: calc(32% - 10px);
  height: 150px;
  display: grid;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid black;
  position: relative;
  transition: 1s transform;
  box-shadow: 2px 2px 4px #000000;
  &&:hover {
    transform: scale(1.1);
    box-shadow: 2px 2px 4px #0c2f73;
    z-index: 100;
  }
  cursor: pointer;
  img {
    width: 60%;
    height: auto;
  }
  @media (max-width: ${size.tablet}) {
    width: 60%;
  }
`;

export const FieldTopic = styled.h3`
  justify-self: center;
  padding-top: 0px !important;
`;
