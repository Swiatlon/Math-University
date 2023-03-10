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
import { ReactComponent as SvgBasic } from 'assets/images/GeometricShapes/triangleBasic.svg';
import { ReactComponent as SvgIsoceles } from 'assets/images/GeometricShapes/triangleIsosceles.svg';
import { ReactComponent as SvgEquilateral } from 'assets/images/GeometricShapes/triangleEquilateral.svg';
import { ReactComponent as SvgRectangular } from 'assets/images/GeometricShapes/triangleRectangular.svg';
import DynamicInputForImage from 'components/atoms/DynamicInputForImage/DynamicInputForImage';
import { wrongDataAlert } from 'helpers/Swal';
import InputWithUnits from '../InputWithUnits/InputWithUnits';
import TriangleFunctions from 'helpers/TriangleFunctions';
import { countUndefined, transformToDecIfNeeded } from 'helpers/Helpers';
import { radToDeg } from 'helpers/Helpers';
import { degToRad } from 'helpers/Helpers';
import { ChoosedPartContainer } from 'views/HighSchool/GeometricShapes/GeometricShapes.style';
import { creatingInputsOnText } from 'helpers/Helpers';

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

  const resetData = () => {
    setInputsToRender([]);
    setResult(initialResultState);
    imagesInputsRefs.current = [];
  };

  const dataCalculation = (a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R, triangleVersion) => {
    //Prepare data
    // Degree -> radians cause of tryg functions like sin/cos/tg
    gamma = degToRad(gamma);
    beta = degToRad(beta);
    alfa = degToRad(alfa);
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    switch (triangleVersion) {
      case 'Prostokatny':
        gamma = Math.PI / 2; // 90 deg
        break;
      case 'Rownoramienny':
        c = b;
        gamma = beta;
        break;
      case 'Rownoboczny':
        b = a;
        c = a;
        alfa = 1.047197551197; //60 deg x 3
        beta = 1.047197551197;
        gamma = 1.047197551197;
        break;
      default:
    }
    // Do Calculations
    do {
      oldAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
      a = a || TriangleFunctions.gettingSideWithAllFunctions(alfa, ha, b, beta, c, gamma, circuit, field, r, R);
      b = b || TriangleFunctions.gettingSideWithAllFunctions(beta, hb, a, alfa, c, gamma, circuit, field, r, R);
      c = c || TriangleFunctions.gettingSideWithAllFunctions(gamma, hc, a, alfa, b, beta, circuit, field, r, R);
      alfa = alfa || TriangleFunctions.gettingAngleAllFunctions(a, b, c, beta, gamma, R);
      beta = beta || TriangleFunctions.gettingAngleAllFunctions(b, a, c, alfa, gamma, R);
      gamma = gamma || TriangleFunctions.gettingAngleAllFunctions(c, a, b, alfa, beta, R);
      ha = ha || TriangleFunctions.getHeight(field, a);
      hb = hb || TriangleFunctions.getHeight(field, b);
      hc = hc || TriangleFunctions.getHeight(field, c);
      R = R || TriangleFunctions.getCircumscribedRadius(a, alfa, b, beta, c, gamma, field);
      r = r || TriangleFunctions.getInscribedRadius(field, a, b, c);
      circuit = circuit || TriangleFunctions.getCircuit(a, b, c);
      field = field || TriangleFunctions.getField(a, ha, alfa, b, hb, beta, c, hc, gamma, r, R);
      actuaAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
    } while (oldAmountOfUndefined !== actuaAmountOfUndefined);
    alfa = radToDeg(alfa);
    beta = radToDeg(beta);
    gamma = radToDeg(gamma);
    return { a, b, c, alfa, beta, gamma, ha, hb, hc, r, R, circuit, field };
  };

  const submitData = () => {
    const variables = ['a', 'b', 'c', 'α', 'β', 'Y', 'h(a)', 'h(b)', 'h(c)', 'r', 'circuit', 'field', 'R'];

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
    const calculatedValues = dataCalculation(...values, choosedTriangleVersion);

    // Checking if everything is correct
    if (calculatedValues.alfa * 1 + calculatedValues.beta * 1 + calculatedValues.Y * 1 > 180) {
      wrongDataAlert('Zbyt wielka rozpietość kątów');
      return setResult({ a: 'Niepoprawne Dane' });
    }

    const wrongSideValues =
      calculatedValues.a > calculatedValues.b + calculatedValues.c ||
      calculatedValues.b > calculatedValues.a + calculatedValues.c ||
      calculatedValues.c > calculatedValues.a + calculatedValues.b;

    if (wrongSideValues) {
      wrongDataAlert('Niepoprawna długość boków trójkata!');
      return setResult({ a: 'Niepoprawne Dane' });
    }

    switch (choosedTriangleVersion) {
      case 'Zwykly':
        break;
      case 'Prostokatny':
        calculatedValues.Y = false; // 90 deg
        break;
      case 'Rownoramienny':
        calculatedValues.c = false;
        calculatedValues.Y = false;
        break;
      case 'Rownoboczny':
        calculatedValues.b = false;
        calculatedValues.beta = false;
        calculatedValues.c = false;
        calculatedValues.Y = false;
        break;
      default:
    }
    setResult(calculatedValues);
  };

  const elements = [
    { name: 'Prostokątny', url: Rectangular },
    { name: 'Równoramienny', url: Isosceles },
    { name: 'Równoboczny', url: Equilateral },
    { name: 'Zwykły', url: Basic },
  ];

  const shape = () => {
    switch (choosedTriangleVersion) {
      case 'Zwykly':
        return (
          <SvgBasic
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgBasic>
        );
      case 'Rownoramienny':
        return (
          <SvgIsoceles
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgIsoceles>
        );
      case 'Rownoboczny':
        return (
          <SvgEquilateral
            onClick={(e) => creatingInputsOnText(e, inputsToRender, imagesInputsRefs, setInputsToRender)}
          ></SvgEquilateral>
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
    <TriangleContainer>
      <h2> Wybierz rodzaj swojego trójkata:</h2>

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
              setChoosedTriangleVersion(boxName);
              resetData();
            }}
          >
            <FieldTopic>{box.name}</FieldTopic>
            <img src={box.url} alt={`${box.name}`}></img>
          </FieldBox>
        ))}
      </FieldsBoxesContainer>

      {choosedTriangleVersion !== null ? (
        <ChoosedPartContainer>
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
    </TriangleContainer>
  );
}

export default Triangle;
