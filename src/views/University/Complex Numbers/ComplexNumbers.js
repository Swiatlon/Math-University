import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import { ComplexNumbersTable } from './ComplexNumbers.style';
import { ComplexNumbersCoordinate } from './ComplexNumbers.style';
import overview from 'assets/images/ComplexNumbers.jpg';
import { ComplexNumberInput } from './ComplexNumbers.style';
import { useRef, useEffect, useState } from 'react';
import MathCoordinateSystem from 'helpers/MathCoordinateSystem';
function ComplexNumbers() {
  // Input
  const initialState = '';
  const [inputValue, setInputValue] = useState(initialState);
  //CoordinateSystem
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      const amountOfNumbers = 7;
      canvas.width = 250;
      canvas.height = 250;
      const field = new MathCoordinateSystem(canvas, amountOfNumbers);
      field.drawMap();
      // field.drawPoint(1, 1);
    }
  }, [canvasRef]);
  //Submits

  return (
    <>
      <TopicTitle>Liczby Zespolone</TopicTitle>
      <TopicSubTitleContainer subTitle={'Opis tematu:'}>
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych. Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Wytłumaczenie tematu:">
        <TopicSubTitleContent>
          <img src={overview} alt="overview" />
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle={'Przykładowe zadania:'}>
        <TopicSubTitleContent>
          <p>Cooming Soon!</p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Kalkulator:">
        <TopicSubTitleContent>
          <h3>Twoja liczba zespolona:</h3>
          <ComplexNumberInput
            type="text"
            placeholder="Wpisz swoją liczbe zespoloną"
            name="ComplexNumberValue"
            value={inputValue}
            onInput={(e) => {
              setInputValue(e.target.value);
            }}
          ></ComplexNumberInput>
          <ComplexNumbersTable>
            <div>
              Wynik: <p></p>
            </div>
            <div>
              Sprzężenie: <p></p>
            </div>
            <div>
              Moduł ∣Z∣: <p></p>
            </div>
            <div>
              Argument: <p></p>
            </div>
            <div>
              Postać trygonometryczna: <p></p>
            </div>
            <div>
              Część rzeczywista - Re(z): <p></p>
            </div>
            <div>
              Część urojona - Im(z): <p></p>
            </div>
          </ComplexNumbersTable>
          <ComplexNumbersCoordinate ref={canvasRef}></ComplexNumbersCoordinate>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default ComplexNumbers;
