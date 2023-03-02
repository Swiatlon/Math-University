import React from 'react';
import { SquareContainer } from './Square.style';
import ResultTable from '../ResultTable/ResultTable';
import InputWithUnits from 'components/molecules/InputWithUnits/InputWithUnits';
import { useState, useRef } from 'react';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import Units from 'components/atoms/Units/Units';
import { unit } from 'mathjs';
import SelectList from 'components/atoms/SelectList/SelectList';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import { transformToDecIfNeeded } from 'helpers/Helpers';
// Okrag wpisany i opisany TODO
// Adding sqrt
function Square() {
  const userUnitsRef = useRef(null);
  const resultUnitsRef = useRef(null);

  const [userChoice, setUserChoice] = useState('bok');
  const handleSelectChange = (e) => {
    setUserChoice(e.target.value);
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const intitialResultState = {
    side: 0,
    field: 0,
    circuit: 0,
    diagonal: 0,
  };
  const [results, setResults] = useState(intitialResultState);

  const mathCalculations = () => {
    //Units
    const userUnit = userUnitsRef.current.value;
    const resultUnit = resultUnitsRef.current.value;
    //Values
    let side;
    const data = Number(inputValue);
    switch (userChoice.toLowerCase()) {
      case 'bok':
        side = data;
        break;
      case 'pole':
        side = Math.sqrt(data);
        break;
      case 'obwód':
        side = data / 4;
        break;
      case 'przekątna':
        side = data / Math.sqrt(2);
        break;
      default:
        side = 'You used wrong data!';
    }
    try {
      side = parseFloat(unit(side, userUnit).to(resultUnit).toString());
      const field = transformToDecIfNeeded(side * side);
      const circuit = transformToDecIfNeeded(side * 4);
      const diagonal = `${side}√2 = ${transformToDecIfNeeded(side * Math.sqrt(2))}`;
      setResults({ side: side, field: field, circuit: circuit, diagonal: diagonal });
    } catch {
      setResults({ ...results, side: 'Niepoprawne dane!' });
    }
  };

  return (
    <SquareContainer>
      <SelectList
        items={['Bok', 'Pole', 'Obwód', 'Przekątna']}
        onChange={handleSelectChange}
        value={userChoice}
      ></SelectList>
      <InputWithUnits
        placeholder={'Podaj: ' + userChoice}
        value={inputValue}
        onChange={handleInputChange}
        maxLength={8}
        unitRef={userUnitsRef}
      ></InputWithUnits>
      <SubmitContainer>
        <GeometricButton onClick={mathCalculations}>Policz</GeometricButton>
        <Units unitRef={resultUnitsRef}></Units>
      </SubmitContainer>
      <ResultTable>
        <div>
          Bok:<p>{results.side}</p>
        </div>
        <div>
          Pole: <p>{results.field}</p>
        </div>
        <div>
          Obwód: <p>{results.circuit}</p>
        </div>
        <div>
          Przekątna: <p>{results.diagonal}</p>
        </div>
      </ResultTable>
    </SquareContainer>
  );
}

export default Square;
