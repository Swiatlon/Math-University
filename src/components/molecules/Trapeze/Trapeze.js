import React, { useState, useRef } from 'react';
import { TrapezeContainer } from './Trapeze.style';
import rectangularUrl from 'assets/images/GeometricShapes/trapezeRectangular.svg';
import isoscelesUrl from 'assets/images/GeometricShapes/trapezeIsosceles.svg';
import basicUrl from 'assets/images/GeometricShapes/trapezeBasic.svg';
import { ReactComponent as SvgRectangular } from 'assets/images/GeometricShapes/trapezeRectangular.svg';
import { ReactComponent as SvgIsosceles } from 'assets/images/GeometricShapes/trapezeIsosceles.svg';
import { ReactComponent as SvgBasic } from 'assets/images/GeometricShapes/trapezeBasic.svg';
import { FieldsBoxesContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldBox } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldTopic } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from '../ResultTable/ResultTable';
import { transformToDecIfNeeded } from 'helpers/Helpers';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';

function Trapeze() {
  const initialResultState = {
    a: '',
    b: '',
    c: '',
    h: '',
    d: '',
    circuit: '',
    Field: '',
  };

  const imagesInputsRefs = useRef([]);
  const [inputsToRender, setInputsToRender] = useState([]);
  const [choosedTrapezeVersion, setChoosedTrapezeVersion] = useState(null);
  const [preResultInputs, setpreResultInputs] = useState({
    circuitInput: '',
    fieldInput: '',
    RVal: '',
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

  const dataCalculation = (a, b, c, h, d, circuit, field) => {
    
  };

  const submitData = () => {
    const variables = ['a', 'b', 'c', 'd', 'circuit', 'field'];

    const values = variables.map((variable) => {
      const value = Number(
        imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value
      );
      return value > 0 ? value : false;
    });
    // After set items we change  α to alfa and same for beta

    variables[3] = 'alfa';
    variables[4] = 'beta';

    const userData = Object.values(preResultInputs).map((item) => (item > 0 ? Number(item) : false));
    values.splice(-3, 3, ...userData);
    const calculatedValues = dataCalculation(...values);

    setResult(calculatedValues);
  };

  const elements = [
    { name: 'Równoramienny', url: isoscelesUrl },
    { name: 'Zwykły', url: basicUrl },
    { name: 'Prostokątny', url: rectangularUrl },
  ];

  const shape = () => {
    switch (choosedTrapezeVersion) {
      case 'Zwykly':
        return (
          <SvgBasic
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgBasic>
        );
      case 'Rownoramienny':
        return (
          <SvgIsosceles
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgIsosceles>
        );
      case 'Prostokatny':
        return (
          <SvgRectangular
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgRectangular>
        );
      default:
        return <></>;
    }
  };

  return (
    <TrapezeContainer>
      <h2> Wybierz rodzaj swojego trapezu:</h2>
      <FieldsBoxesContainer>
        {elements.map((box) => (
          <FieldBox
            key={box.name}
            elemPerRow={2.7}
            onClick={() => {
              // Normalize text
              let boxName = box.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              // Change polish chars
              boxName = boxName.replace(/[ł]/g, 'l');
              setChoosedTrapezeVersion(boxName);
              resetData();
            }}
          >
            <FieldTopic>{box.name}</FieldTopic>
            <img src={box.url} alt={`${box.name}`}></img>
          </FieldBox>
        ))}

        {choosedTrapezeVersion !== null ? (
          <ChoosedPartContainer>
            <h2>Podaj wszystkie wartości które znasz</h2>
            <div style={{ position: 'relative' }} className="bigger">
              {shape()}
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
            <InputWithUnits
              placeholder={'Promień okregu opisanego: '}
              value={preResultInputs.RVal}
              onChange={(e) => handleChange(e, 'RVal')}
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
        ) : (
          ''
        )}
      </FieldsBoxesContainer>{' '}
    </TrapezeContainer>
  );
}

export default Trapeze;
