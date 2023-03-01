import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
const subMenuColors = ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb'];
export const SubMenuStyled = styled.ul`
  position: absolute;
  list-style: none;
  left: 100.2%;
  top: -1px;
  min-width: max-content;
  border: 1.5px solid black;
  z-index: 100;
  background: ${(props) => subMenuColors[props.depthLevel]};
  &&.firstSubMenu {
    left: -30% !important;
    top: initial !important;
    margin-top: 56px;
    /* top: 0px; */
  }
  @media (max-width: ${size.laptop}) {
    margin-top: 0px !important;
    top: 100% !important;
    &&,
    &&.firstSubMenu {
      left: 0 !important;
      border: none;
      width: 100vw;
    }
    &&.firstSubMenu {
      overflow-x: hidden;
      overflow: visible;
      top: 3em !important;
    }
  }
`;
