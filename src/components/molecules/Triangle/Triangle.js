import React from 'react';
import { FieldsBoxesContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldBox } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldTopic } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { useState } from 'react';
import Rectangular from 'assets/images/GeometricShapes/triangleRectangular.png';
import Isosceles from 'assets/images/GeometricShapes/triangleIsosceles.png';
import Equilateral from 'assets/images/GeometricShapes/triangleEquilateral.png';
import Basic from 'assets/images/GeometricShapes/triangleBasic.png';
import { TriangleContainer } from './Triangle.style';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from '../ResultTable/ResultTable';
import { useRef } from 'react';
import { ReactComponent as EditableSVGText } from 'assets/images/GeometricShapes/triangleBasic.svg';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { wrongDataAlert } from 'helpers/Swal';
import InputWithUnits from '../InputWithUnits/InputWithUnits';

function Triangle() {
  const imagesInputsRefs = useRef([]);
  const containerRef = useRef(null);

  const [inputsToRender, setInputsToRender] = useState([]);
  const [choosedTriangleVersion, setChoosedTriangleVersion] = useState(null);
  const [fieldInput, setFieldInput] = useState(null);
  const [circuitInput, setCircuitField] = useState(null);

  const handleFieldChange = (e) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setFieldInput(e.target.value);
    }
  };

  const handleCircuitChange = (e) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setCircuitField(e.target.value);
    }
  };

  const creatingInputsOnText = (event) => {
    if (event.target.localName === 'tspan') {
      const { offsetX, offsetY } = event.nativeEvent;
      const x = offsetX - 15;
      const y = offsetY - 15;
      const text = { value: event.target.innerHTML, x, y, placeholder: event.target.innerHTML };
      const arrayContainThisItem = inputsToRender.some((item) => {
        return text.value === item.value;
      });
      if (!arrayContainThisItem) {
        const newInputRef = React.createRef();
        imagesInputsRefs.current.push(newInputRef);
        setInputsToRender([...inputsToRender, text]);
      }
    }
  };

  const mathCalculations = () => {
    const inputsValues = imagesInputsRefs.current.map((ref) => {
      return {
        name: ref.current?.attributes[0]?.value, // placeholder
        value: ref.current.value,
      };
    });
    const isDataValid = inputsValues.every((item) => /^[0-9]{0,3}$/.test(item?.value));
    if (!isDataValid) wrongDataAlert();
    else {
      const a = 0;
      const b = 0;
      const c = 0;
      const alfa = 0;
      const beta = 0;
      const gamma = 0;
      const ha = 0;
      const hb = 0;
      const hc = 0;
      const r = 0;
      const field = fieldInput;
      const circuit = circuitInput;
    }
    // All the calculations
  };

  const elements = [
    { name: 'Prostokątny', url: Rectangular },
    { name: 'Równoramienny', url: Isosceles },
    { name: 'Równoboczny', url: Equilateral },
    { name: 'Zwykły', url: Basic },
  ];

  const shape = () => {
    switch (choosedTriangleVersion) {
      case 'Zwykły':
        return <EditableSVGText onClick={creatingInputsOnText}> </EditableSVGText>;

      case 'Prostokąt':
        return 0;
      case 'Trójkąt':
        return 0;
      case 'Trapez':
        return 0;
      default:
        return <></>;
    }
  };

  return (
    <TriangleContainer ref={containerRef}>
      <h2> Wybierz rodzaj swojego trójkata:</h2>

      <FieldsBoxesContainer>
        {elements.map((box) => (
          <FieldBox
            key={box.name}
            elemPerRow={2.7}
            onClick={() => {
              setChoosedTriangleVersion(box.name);
              setInputsToRender([]);
            }}
          >
            <FieldTopic>{box.name}</FieldTopic>
            <img src={box.url} alt={`${box.name}`}></img>
          </FieldBox>
        ))}
      </FieldsBoxesContainer>

      {choosedTriangleVersion !== null ? (
        <>
          <h2>Podaj wszystkie wartości które znasz</h2>
          <div style={{ position: 'relative' }}>
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

          <InputWithUnits
            placeholder={'Podaj pole: '}
            value={fieldInput}
            onChange={handleFieldChange}
            maxLength={8}
            noUnits={true}
          ></InputWithUnits>
          <InputWithUnits
            placeholder={'Podaj obwód: '}
            value={circuitInput}
            onChange={handleCircuitChange}
            maxLength={8}
            noUnits={true}
          ></InputWithUnits>
          <SubmitContainer>
            <GeometricButton onClick={mathCalculations}>Policz</GeometricButton>
          </SubmitContainer>

          <ResultTable>
            <div>
              Bok:<p>{0}</p>
            </div>
            <div>
              Pole: <p>{0}</p>
            </div>
          </ResultTable>
        </>
      ) : (
        ''
      )}
    </TriangleContainer>
  );
}

export default Triangle;
