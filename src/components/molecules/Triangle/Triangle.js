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
import { countUndefined } from 'helpers/Helpers';

function Triangle() {
  const imagesInputsRefs = useRef([]);

  const [inputsToRender, setInputsToRender] = useState([]);
  const [choosedTriangleVersion, setChoosedTriangleVersion] = useState(null);
  const [RVal, setRVal] = useState('');
  const [fieldInput, setFieldInput] = useState('');
  const [circuitInput, setCircuitInput] = useState('');

  const handleChange = (e, setter) => {
    if (/^[\d\b.,]*$/.test(e.target.value)) {
      setter(e.target.value);
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

  const calculatingSite = (a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R) => {
    // Degree -> radians cause of tryg functions like sin/cos/tg
    gamma = (Math.PI / 180) * gamma;
    beta = (Math.PI / 180) * beta;
    alfa = (Math.PI / 180) * alfa;
    let oldAmountOfUndefined;
    let actuaAmountOfUndefined;
    if ((gamma ?? 0) + (beta ?? 0) + (alfa ?? 0) <= 3.1416) {
      do {
        oldAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
        a = a ? a : TriangleFunctions.gettingSideWithAllFunctions(alfa, ha, b, beta, c, gamma, circuit, field, r, R);
        b = b ? b : TriangleFunctions.gettingSideWithAllFunctions(beta, hb, a, alfa, c, gamma, circuit, field, r, R);
        c = c ? c : TriangleFunctions.gettingSideWithAllFunctions(gamma, hc, a, alfa, b, beta, circuit, field, r, R);
        alfa = TriangleFunctions.gettingAngleAllFunctions(a, b, c, beta, gamma);
        beta = TriangleFunctions.gettingAngleAllFunctions(b, a, c, alfa, gamma);
        gamma = TriangleFunctions.gettingAngleAllFunctions(c, a, b, alfa, beta);
        ha = TriangleFunctions.getHeight(field, a);
        hb = TriangleFunctions.getHeight(field, b);
        hc = TriangleFunctions.getHeight(field, c);
        R = TriangleFunctions.gettingCircumscribedRadius(a, alfa, b, beta, c, gamma, field);
        r = TriangleFunctions.gettingInscribedRadius(field, a, b, c);
        circuit = TriangleFunctions.gettingCircuit(a, b, c);
        field = TriangleFunctions.gettingField(a, ha, alfa, b, hb, beta, c, hc, gamma, r, R);
        actuaAmountOfUndefined = countUndefined([a, b, c, alfa, beta, gamma, ha, hb, hc, r, circuit, field, R]);
        
      } while (oldAmountOfUndefined === actuaAmountOfUndefined);
    } else {
      wrongDataAlert('Przekroczono maksymalna rozpietość kątów ');
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
    if (!isDataValid) wrongDataAlert('Dane są nieprawidłowe');
    else {
      const variables = ['a', 'b', 'c', 'α', 'β', 'Y', 'h(a)', 'h(b)', 'h(c)', 'r'];
      const values = [];

      for (let variable of variables) {
        const value =
          imagesInputsRefs.current.find((element) => element.current.attributes[0].value === variable)?.current.value ??
          null;
        values.push(Number(value));
      }

      let [a, b, c, alfa, beta, gamma, ha, hb, hc, r] = values;

      calculatingSite(
        a,
        b,
        c,
        alfa,
        beta,
        gamma,
        ha,
        hb,
        hc,
        r,
        Number(circuitInput),
        Number(fieldInput),
        Number(RVal)
      );
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
              setInputsToRender([]);
              imagesInputsRefs.current = [];
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
              imagesInputsRefs.current = [];
              setInputsToRender([]);
            }}
          >
            Resetuj rysunek
          </GeometricButton>

          <InputWithUnits
            placeholder={'Podaj pole: '}
            value={fieldInput}
            onChange={(e) => handleChange(e, setFieldInput)}
            maxLength={8}
            noUnits={true}
          ></InputWithUnits>
          <InputWithUnits
            placeholder={'Podaj obwód: '}
            value={circuitInput}
            onChange={(e) => handleChange(e, setCircuitInput)}
            maxLength={8}
            noUnits={true}
          ></InputWithUnits>
          <InputWithUnits
            placeholder={'Promień okregu opisanego: '}
            value={RVal}
            onChange={(e) => handleChange(e, setRVal)}
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
