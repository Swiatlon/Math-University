import React, { useState, useRef } from 'react';
import { ReactComponent as SvgCircleSector } from 'assets/images/GeometricShapes/circleSector.svg';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from '../ResultTable/ResultTable';
import { transformAllToDecIfNeeded } from 'helpers/Helpers';
import { countUndefined } from 'helpers/Helpers';
import { CircleAndSector } from 'helpers/CircleAndSector';
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

  const dataCalculation = (r, l, alfa, beta, field) => {
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    do {
      oldAmountOfUndefined = countUndefined([r, l, alfa, beta, field]);
      r = r || CircleAndSector.getSectorRadius(field, alfa, l);
      alfa = alfa || CircleAndSector.getSectorAlfaAngle(r, beta, l, field);
      l = l || CircleAndSector.getDiamenter(r, alfa);
      field = field || CircleAndSector.getSectorField(alfa, r, l);
      beta = beta || 360 - alfa;
      actuaAmountOfUndefined = countUndefined([r, l, alfa, beta, field]);
    } while (oldAmountOfUndefined !== actuaAmountOfUndefined);
    return transformAllToDecIfNeeded({ r, l, alfa, beta, field }, 2);
  };

  const submitData = () => {
    const variables = ['r', 'l', 'α', 'β', 'field'];

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
    values.splice(-1, 1, ...userData);
    const calculatedValues = dataCalculation(...values);

    calculatedValues.l += 'π';
    calculatedValues.field += 'π';

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

      <SubmitContainer>
        <GeometricButton onClick={submitData}>Policz</GeometricButton>
      </SubmitContainer>

      <ResultTable>
        {Object.entries(result).map(([key, value]) =>
          value ? (
            <div key={key}>
              {key}:<p>{value}</p>
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
