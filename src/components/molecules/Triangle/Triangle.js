import React, { useRef, useState } from 'react';
import { FieldsBoxesContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldBox } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { FieldTopic } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import Rectangular from 'assets/images/GeometricShapes/triangleRectangular.png';
import Isosceles from 'assets/images/GeometricShapes/triangleIsosceles.png';
import Equilateral from 'assets/images/GeometricShapes/triangleEquilateral.png';
import Basic from 'assets/images/GeometricShapes/triangleBasic.png';
import { TriangleContainer } from './Triangle.style';
import { GeometricButton } from 'components/atoms/GeometricButton/GeometricButton.style';
import { SubmitContainer } from 'components/atoms/GeometricButton/GeometricButton.style';
import ResultTable from '../ResultTable/ResultTable';
import { ReactComponent as EditableSVGText } from 'assets/images/GeometricShapes/triangleBasic.svg';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { wrongDataAlert } from 'helpers/Swal';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import TriangleFunctions from 'helpers/TriangleFunctions';
import { countUndefined, transformToDecIfNeeded } from 'helpers/Helpers';
import { radToDeg } from 'helpers/Helpers';
import { degToRad } from 'helpers/Helpers';

function Triangle() {
  const initialResultState = {
    a: '',
    b: '',
    c: '',
    alfa: '',
    beta: '',
    gamma: '',
    ha: '',
    hb: '',
    hc: '',
    r: '',
    circuit: '',
    R: '',
    Field: '',
  };

  const imagesInputsRefs = useRef([]);

  const [inputsToRender, setInputsToRender] = useState([]);
  const [choosedTriangleVersion, setChoosedTriangleVersion] = useState(null);
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

  const resetData = () => {
    setInputsToRender([]);
    setResult(initialResultState);
    imagesInputsRefs.current = [];
  };

  const dataCalculation = (a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R) => {
    // Degree -> radians cause of tryg functions like sin/cos/tg
    gamma = degToRad(gamma);
    beta = degToRad(beta);
    alfa = degToRad(alfa);
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    if ((gamma ?? 0) + (beta ?? 0) + (alfa ?? 0) <= Math.PI) {
      do {
        oldAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
        a = a || TriangleFunctions.gettingSideWithAllFunctions(alfa, ha, b, beta, c, gamma, circuit, field, r, R);
        b = b || TriangleFunctions.gettingSideWithAllFunctions(beta, hb, a, alfa, c, gamma, circuit, field, r, R);
        c = c || TriangleFunctions.gettingSideWithAllFunctions(gamma, hc, a, alfa, b, beta, circuit, field, r, R);
        alfa = alfa || TriangleFunctions.gettingAngleAllFunctions(a, b, c, beta, gamma);
        beta = beta || TriangleFunctions.gettingAngleAllFunctions(b, a, c, alfa, gamma);
        gamma = gamma || TriangleFunctions.gettingAngleAllFunctions(c, a, b, alfa, beta);
        ha = ha || TriangleFunctions.getHeight(field, a);
        hb = hb || TriangleFunctions.getHeight(field, b);
        hc = hc || TriangleFunctions.getHeight(field, c);
        R = TriangleFunctions.gettingCircumscribedRadius(a, alfa, b, beta, c, gamma, field);
        r = r || TriangleFunctions.gettingInscribedRadius(field, a, b, c);
        circuit = circuit || TriangleFunctions.gettingCircuit(a, b, c);
        field = field || TriangleFunctions.gettingField(a, ha, alfa, b, hb, beta, c, hc, gamma, r, R);
        actuaAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
      } while (oldAmountOfUndefined !== actuaAmountOfUndefined);

      setResult({
        a: a,
        b: b,
        c: c,
        alfa: radToDeg(alfa),
        beta: radToDeg(beta),
        gamma: radToDeg(gamma),
        ha: ha,
        hb: hb,
        hc: hc,
        r: r,
        R: R,
        circuit: circuit,
        field: field,
      });
    } else {
      wrongDataAlert('Przekroczono maksymalna rozpietość kątów ');
    }
  };

  const submitData = () => {
    const imagesInputsValues = imagesInputsRefs.current.map((ref) => {
      return {
        name: ref.current?.attributes[0]?.value, // placeholder
        value: ref.current.value,
      };
    });
    const isDataValid = imagesInputsValues.every((item) => /^\d{0,3}(\.\d{0,6})?$/.test(item?.value));
    if (!isDataValid) wrongDataAlert('Dane są nieprawidłowe');
    else {
      const variables = ['a', 'b', 'c', 'α', 'β', 'Y', 'h(a)', 'h(b)', 'h(c)', 'r'];
      const values = variables.map((variable) => {
        const value = Number(
          imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value
        );
        return value > 0 ? value : false;
      });
      const userData = Object.values(preResultInputs).map((item) => (item > 0 ? Number(item) : false));
      dataCalculation(...values, ...userData);
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
    <TriangleContainer>
      <h2> Wybierz rodzaj swojego trójkata:</h2>

      <FieldsBoxesContainer>
        {elements.map((box) => (
          <FieldBox
            key={box.name}
            elemPerRow={2.7}
            onClick={() => {
              setChoosedTriangleVersion(box.name);
              resetData();
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
            {Object.entries(result).map(([key, value]) => (
              <div key={key}>
                {key}:<p>{transformToDecIfNeeded(value, 2)}</p>
              </div>
            ))}
          </ResultTable>
        </>
      ) : (
        ''
      )}
    </TriangleContainer>
  );
}

export default Triangle;
