import React, { useState, useRef } from 'react';
import { ReactComponent as SvgRhomb } from 'assets/images/GeometricShapes/rhomb.svg';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import InputWithUnits from 'components/molecules/InputWithUnits/InputWithUnits';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from 'components/molecules/ResultTable/ResultTable';
import { transformToDecIfNeeded } from 'helpers/Helpers';
import { countUndefined } from 'helpers/Helpers';
import { transformAllToDecIfNeeded } from 'helpers/Helpers';
import { RhombFunctions } from 'helpers/GeometricFunctions/RhombFunctions';
function Rhomb() {
  const initialResultState = {
    a: '',
    alfa: '',
    h: '',
    d1: '',
    d2: '',
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

  const dataCalculation = (a, alfa, h, d1, d2, circuit, field) => {
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    do {
      console.log(a);
      oldAmountOfUndefined = countUndefined([a, alfa, h, d1, d2, circuit, field]);
      a = a || RhombFunctions.getSide(field, h, alfa, d1, d2, circuit);
      h = h || RhombFunctions.getHeight(a, field, alfa);
      d1 = d1 || RhombFunctions.getDiagonal(field, d2, a);
      d2 = d2 || RhombFunctions.getDiagonal(field, d1, a);
      alfa = alfa || RhombFunctions.getAngle(a, field, h);
      circuit = circuit || RhombFunctions.getCircuit(a);
      field = field || RhombFunctions.getField(d1, d2, a, h, alfa);
      actuaAmountOfUndefined = countUndefined([a, alfa, h, d1, d2, circuit, field]);
      console.log(RhombFunctions.getAngle(a, field, h));
    } while (oldAmountOfUndefined !== actuaAmountOfUndefined);
    return transformAllToDecIfNeeded({ a, alfa, h, d1, d2, circuit, field }, 2);
  };

  const submitData = () => {
    const variables = ['a', 'α', 'h', 'd1', 'd2', 'circuit', 'field'];

    const values = variables.map((variable) => {
      const value = Number(
        imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value
      );
      return value > 0 ? value : false;
    });
    // After set items we change  α to alfa

    variables[1] = 'alfa';

    const userData = Object.values(preResultInputs).map((item) => (item > 0 ? Number(item) : false));
    values.splice(-2, 2, ...userData);
    const calculatedValues = dataCalculation(...values);

    setResult(calculatedValues);
  };
  return (
    <ChoosedPartContainer>
      <h2>Podaj wszystkie wartości które znasz</h2>
      <div style={{ position: 'relative' }} className="bigger">
        <SvgRhomb
          onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
        ></SvgRhomb>
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

export default Rhomb;
