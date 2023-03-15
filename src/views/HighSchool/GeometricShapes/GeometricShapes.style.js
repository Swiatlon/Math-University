import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const FieldsBoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  grid-gap: 15px;
  padding-top: 20px;
  padding-bottom: 25px;
`;

export const FieldBox = styled.div`
  width: calc(${({ elemPerRow }) => 100 / elemPerRow - 1}% - 10px);
  height: 150px;
  display: grid;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid black;
  position: relative;
  transition: 1s transform;
  box-shadow: 2px 2px 4px #000000;
  height: max-content;
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

export const ChoosedPartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  @media (max-width: 600px) {
    .bigger {
      width: 80% !important;
    }
    svg {
      width: 100%;
    }
  }
`;
