import styled from 'styled-components';

export const ResultTableContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
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
    border: 1px solid black;
    width: 60%;
    color: black;
    overflow: hidden;
    word-break: break-all;
  }
`;
