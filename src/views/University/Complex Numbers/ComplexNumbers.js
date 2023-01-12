import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import overview from 'assets/images/ComplexNumbers.png';
import ComplexNumbersCoordinateSystem from 'components/molecules/CoordinateSystems/ComplexNumbers/ComplexNumbersCoordinateSystem';
import { useRef, useEffect } from 'react';
import MathCoordinateSystem from 'helpers/MathCoordinateSystem';
import { useState } from 'react';
function ComplexNumbers() {
  //Input Handler
  // const initialState = '';
  // const [complexNumber, setComplexNumber] = useState(initialState);
  // const inputHandler = (e) => {
  //   setComplexNumber(e.target.value);
  // };
  //CoordinateSystem
  const canvasRef = useRef(null);
  console.log(canvasRef);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      console.log(canvasRef);
      console.log(canvasRef);
      canvas.width = 600;
      canvas.height = 600;
      const amountOfNumbers = 6;
      const field = new MathCoordinateSystem(canvas, amountOfNumbers);
      field.drawMap();
      // field.drawPoint(1, 1);
    }
  }, [canvasRef]);
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
        <TopicSubTitleContent>{/* <img src={overview} alt="overview" /> */}</TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Wzory:">
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych.Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle={'Przykładowe zadania:'}>
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych.Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Kalkulator:">
        <canvas ref={canvasRef}></canvas>
        {/* <TopicSubTitleContent> */}
        {/* <input
            type="text"
            value={complexNumber}
            placeholder="Wpisz swoją liczbe zespoloną"
            onChange={inputHandler}
          ></input> */}
        {/* <ComplexNumbersCoordinateSystem width={600} height={600} amountOfNumbers={9}></ComplexNumbersCoordinateSystem> */}
        {/* </TopicSubTitleContent> */}
      </TopicSubTitleContainer>
    </>
  );
}

export default ComplexNumbers;
