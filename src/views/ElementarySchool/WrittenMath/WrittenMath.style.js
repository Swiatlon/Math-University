import styled from 'styled-components';

export const WrittenMathInput = styled.input`
  font-size: 18px;
  padding: 15px;
  width: 25%;
  text-align: center;
`;
export const WrittenMathInputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  input:nth-child(2) {
    width: 60px;
  }
  input[type='submit'] {
    cursor: pointer;
    background: white;
    text-decoration: none;
    border: 1px solid gray;
  }
  @media (max-width: 700px) {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    input {
      width: 250px;
    }
  }
`;
export const SummaryContainer = styled.div`
  margin-top: 46px;
  font-size: 24px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
  p:nth-child(1) {
    color: lightblue;
  }
  p:nth-child(3) {
    border-bottom: 1px solid black;
  }
`;
