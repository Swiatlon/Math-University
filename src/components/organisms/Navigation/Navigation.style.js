import styled from 'styled-components';
import { size } from 'assets/styles/mediaQueries.style';
export const Menu = styled.ul`
  display: grid;
  grid-auto-flow: column;
  list-style: none;
  gap: 20px;
  justify-content: center;
  font-size: 18px;
  .logo-container {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .hamburger {
    position: fixed;
    top: 0;
    right: 0;
    margin-right: 40px;
    margin-top: 3em;
    display: none;
  }
  * {
    cursor: pointer;
  }
  @media (max-width: ${size.laptop}) {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    justify-content: space-evenly;
    && div:nth-child(1) {
      order: 1;
    }
    .logo-container {
      display: flex;
      justify-content: center;
      height: auto;
      order: -1;
    }
    .hamburger {
      display: block;
    }
  }
`;
export const Nav = styled.nav`
  width: 100vw;
  background: #0c2f73;
  color: white;
  position: absolute;
  display: grid;
  transition: 1s height;
  height: 150px;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  @media (max-width: ${size.laptop}) {
    && {
      overflow-y: scroll;
    }
    &&.navHide {
      //Animation
      height: 140px;
      .logo {
        margin-top: 10px;
      }
    }
    &&.navShow {
      // Animation
      height: 100vh;
    }
  }
`;
