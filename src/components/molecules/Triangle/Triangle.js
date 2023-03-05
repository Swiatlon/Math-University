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

function Triangle() {
  const inputsRefs = useRef([]);
  const containerRef = useRef(null);

  const [inputsToRender, setInputsToRender] = useState([]);
  const [choosedTriangleVersion, setChoosedTriangleVersion] = useState(null);

  const creatingInputsOnText = (event) => {
    if (event.target.localName === 'tspan') {
      const { offsetX, offsetY } = event.nativeEvent;
      const x = offsetX - 35;
      const y = offsetY - 20;
      const text = { value: event.target.innerHTML, x, y };
      const arrayContainThisItem = inputsToRender.some((item) => {
        return text.value === item.value;
      });
      if (!arrayContainThisItem) {
        const newInputRef = React.createRef();
        inputsRefs.current.push(newInputRef);
        setInputsToRender([...inputsToRender, text]);
      }
    }
  };

  const mathCalculations = () => {
    const inputsValues = inputsRefs.current.map((ref) => ref.current.value);
    console.log(inputsValues);
  };

  const elements = [
    { name: 'Prostokątny', url: Rectangular },
    { name: 'Równoramienny', url: Isosceles },
    { name: 'Równoboczny', url: Equilateral },
    { name: 'Zwykły', url: Basic },
  ];

  const shapes = () => {
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
        <div style={{ position: 'relative' }}>
          {shapes()}
          {inputsToRender.map((item, index) => (
            <DynamicInputForImage x={item.x} y={item.y} ref={inputsRefs.current[index]} />
          ))}
        </div>
      ) : (
        ''
      )}

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
    </TriangleContainer>
  );
}

export default Triangle;
