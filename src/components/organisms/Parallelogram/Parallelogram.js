import React, { useState, useRef } from 'react';
import { ReactComponent as SvgParallelogram } from 'assets/images/GeometricShapes/parallelogram.svg';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import InputWithUnits from 'components/molecules/InputWithUnits/InputWithUnits';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from 'components/molecules/ResultTable/ResultTable';
import { transformToDecIfNeeded } from 'helpers/Helpers';
import { countUndefined } from 'helpers/Helpers';
import { ParallelogramFunctions } from 'helpers/GeometricFunctions/ParallelogramFunctions';
import { transformAllToDecIfNeeded } from 'helpers/Helpers';
function Parallelogram() {
  const initialResultState = {
    a: '',
    b: '',
    alfa: '',
    gamma: ' ',
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

  const dataCalculation = (a, b, alfa, gamma, h, d1, d2, circuit, field) => {
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    do {
      oldAmountOfUndefined = countUndefined([a, b, alfa, gamma, h, d1, d2, circuit, field]);
      a = a || ParallelogramFunctions.getFirstSide(field, b, alfa, circuit, h);
      b = b || ParallelogramFunctions.getSecondSide(field, a, alfa, circuit);
      alfa = alfa || ParallelogramFunctions.getAlfa(field, a, b);
      gamma = gamma || ParallelogramFunctions.getGamma(field, d1, d2);
      h = h || ParallelogramFunctions.getHeight(field, a);
      d1 = d1 || ParallelogramFunctions.getD1(a, b, alfa);
      d2 = d2 || ParallelogramFunctions.getD2(a, b, alfa);
      circuit = circuit || ParallelogramFunctions.getCircuit(a, b);
      field = field || ParallelogramFunctions.getField(a, b, alfa, gamma, h, d1, d2);
      actuaAmountOfUndefined = countUndefined([a, b, alfa, gamma, h, d1, d2, circuit, field]);
    } while (oldAmountOfUndefined !== actuaAmountOfUndefined);
    return transformAllToDecIfNeeded({ a, b, alfa, gamma, h, d1, d2, circuit, field }, 2);
  };
  const submitData = () => {
    const variables = ['a', 'b', 'α', 'Y', 'h', 'd1', 'd2', 'circuit', 'field'];

    const values = variables.map((variable) => {
      const value = Number(
        imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value
      );
      return value > 0 ? value : false;
    });
    // After set items we change  α to alfa and same for beta

    variables[2] = 'alfa';
    variables[3] = 'gamma';

    const userData = Object.values(preResultInputs).map((item) => (item > 0 ? Number(item) : false));
    values.splice(-2, 2, ...userData);
    const calculatedValues = dataCalculation(...values);

    setResult(calculatedValues);
  };
  return (
    <ChoosedPartContainer>
      <h2>Podaj wszystkie wartości które znasz</h2>
      <div style={{ position: 'relative' }} className="bigger">
        <SvgParallelogram
          onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
        ></SvgParallelogram>
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

export default Parallelogram;
