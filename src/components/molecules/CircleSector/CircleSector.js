import React, { useState, useRef } from 'react';
import { ReactComponent as SvgCircleSector } from 'assets/images/GeometricShapes/circleSector.svg';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from '../ResultTable/ResultTable';
import { transformToDecIfNeeded } from 'helpers/Helpers';
function CircleSector() {
  const initialResultState = {
    r: '',
    l: '',
    alfa: '',
    beta: '',
    circuit: '',
    field: '',
  };
  const imagesInputsRefs = useRef([]);
  const [inputsToRender, setInputsToRender] = useState([]);
  const [preResultInputs, setpreResultInputs] = useState({
    circuitInput: '',
    fieldInput: '',
  });
  const [result, setResult] = useState(initialResultState);

  const handleChange = (e, key) => {
    setpreResultInputs({
      ...preResultInputs,
      [key]: e.target.value,
    });
  };

  const resetData = () => {
    setInputsToRender([]);
    setResult(initialResultState);
    imagesInputsRefs.current = [];
  };

  const dataCalculation = (r, l, alfa, beta, circuit, field) => {};

  const submitData = () => {
    const variables = ['r', 'l', 'alfa', 'beta', 'circuit', 'field'];

    const values = variables.map((variable) => {
      const value = Number(
        imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value
      );
      return value > 0 ? value : false;
    });
    // After set items we change  α to alfa and same for beta

    variables[2] = 'alfa';
    variables[3] = 'beta';

    const userData = Object.values(preResultInputs).map((item) => (item > 0 ? Number(item) : false));
    values.splice(-3, 3, ...userData);
    const calculatedValues = dataCalculation(...values);

    setResult(calculatedValues);
  };
  return (
    <ChoosedPartContainer>
      <h2>Podaj wszystkie wartości które znasz</h2>
      <div style={{ position: 'relative' }} className="bigger">
        <SvgCircleSector
          onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
        ></SvgCircleSector>
        {inputsToRender.map((item, index) => (
          <DynamicInputForImage
            key={index}
            x={item.x}
            y={item.y}
            ref={imagesInputsRefs.current[index]}
            placeholder={item.placeholder}
          />
        ))}
      </div>

      <GeometricButton
        onClick={() => {
          resetData();
        }}
      >
        Resetuj rysunek
      </GeometricButton>

      <InputWithUnits
        placeholder={'Podaj pole: '}
        value={preResultInputs.fieldInput}
        onChange={(e) => handleChange(e, 'fieldInput')}
        maxLength={8}
        noUnits={true}
      ></InputWithUnits>
      <InputWithUnits
        placeholder={'Podaj obwód: '}
        value={preResultInputs.circuitInput}
        onChange={(e) => handleChange(e, 'circuitInput')}
        maxLength={8}
        noUnits={true}
      ></InputWithUnits>

      <SubmitContainer>
        <GeometricButton onClick={submitData}>Policz</GeometricButton>
      </SubmitContainer>

      <ResultTable>
        {Object.entries(result).map(([key, value]) =>
          value ? (
            <div key={key}>
              {key}:<p>{transformToDecIfNeeded(value, 2)}</p>
            </div>
          ) : (
            ''
          )
        )}
      </ResultTable>
    </ChoosedPartContainer>
  );
}

export default CircleSector;
