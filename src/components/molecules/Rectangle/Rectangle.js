import React from 'react';
import { RectangleContainer } from './Rectangle.style';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import { useRef, useState } from 'react';
import SelectList from 'components/atoms/SelectList/SelectList';
import ResultTable from '../ResultTable/ResultTable';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import Units from 'components/atoms/Units/Units';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import { unit } from 'mathjs';
import { transformToDecIfNeeded } from 'helpers/Helpers';

function Rectangle() {
  const userUnitFirstFieldRef = useRef(null);
  const userUnitSecondFieldRef = useRef(null);
  const resultUnitsRef = useRef(null);

  const [userChoice, setUserChoice] = useState('bok');
  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');

  const handleSelectChange = (e) => {
    setUserChoice(e.target.value);
  };

  const handleFirstInputChange = (e) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setFirstInputValue(e.target.value);
    }
  };

  const handleSecondInputChange = (e) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setSecondInputValue(e.target.value);
    }
  };

  const intitialResultState = {
    firstSide: 0,
    secondSide: 0,
    field: 0,
    circuit: 0,
    diagonal: 0,
  };
  const [results, setResults] = useState(intitialResultState);

  const mathCalculations = () => {
    const userFirstUnit = userUnitFirstFieldRef.current.value;
    const userSecondUnit = userUnitSecondFieldRef.current.value;
    const resultUnit = resultUnitsRef.current.value;
    let firstSide = Number(firstInputValue);
    let secondSide;
    const data = Number(secondInputValue);
    switch (userChoice.toLowerCase()) {
      case 'bok':
        secondSide = data;
        break;
      case 'pole':
        secondSide = data / firstSide;
        break;
      case 'obwód':
        secondSide = (data - 2 * firstSide) / 2;
        break;
      case 'przekątna':
        secondSide = Math.sqrt(data * data - firstSide * firstSide);
        break;
      default:
        secondSide = 'You used wrong data!';
    }
    try {
      firstSide = parseFloat(unit(firstSide, userFirstUnit).to(resultUnit).toString());
      secondSide = parseFloat(unit(secondSide, userSecondUnit).to(resultUnit).toString());
      const field = transformToDecIfNeeded(firstSide * secondSide);
      const circuit = transformToDecIfNeeded(2 * firstSide + 2 * secondSide);
      const diagonal = `√${firstSide * firstSide + secondSide * secondSide} = ${transformToDecIfNeeded(
        Math.sqrt(firstSide * firstSide + secondSide * secondSide)
      )}`;
      setResults({
        firstSide: transformToDecIfNeeded(firstSide),
        secondSide: transformToDecIfNeeded(secondSide),
        field: field,
        circuit: circuit,
        diagonal: diagonal,
      });
    } catch {
      setResults({ ...results, side: 'Niepoprawne dane!' });
    }
  };
  return (
    <RectangleContainer>
      <InputWithUnits
        placeholder={'Podaj jeden bok '}
        value={firstInputValue}
        onChange={handleFirstInputChange}
        maxLength={8}
        unitRef={userUnitFirstFieldRef}
      ></InputWithUnits>
      <SelectList
        items={['Bok', 'Pole', 'Obwód', 'Przekątna']}
        onChange={handleSelectChange}
        value={userChoice}
      ></SelectList>
      <InputWithUnits
        placeholder={'Podaj: ' + userChoice}
        value={secondInputValue}
        onChange={handleSecondInputChange}
        maxLength={8}
        unitRef={userUnitSecondFieldRef}
      ></InputWithUnits>
      <SubmitContainer>
        <GeometricButton onClick={mathCalculations}>Policz</GeometricButton>
        <Units unitRef={resultUnitsRef}></Units>
      </SubmitContainer>
      <ResultTable>
        <div>
          1 Bok:<p>{results.firstSide}</p>
        </div>
        <div>
          2 Bok:<p>{results.secondSide}</p>
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
    </RectangleContainer>
  );
}

export default Rectangle;
