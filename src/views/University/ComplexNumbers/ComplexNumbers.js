import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import ResultTable from 'components/molecules/ResultTable/ResultTable';
import overview from 'assets/images/ComplexNumbers.jpg';
import { ComplexNumberInput } from './ComplexNumbers.style';
import { useRef, useState } from 'react';
import { evaluate, complex } from 'mathjs';
function ComplexNumbers() {
  const intitialResultState = {
    result: '',
    conjugate: '',
    module: '',
    argument: '',
    trigonometricForm: '',
    re: '',
    im: '',
    errorOccuried: false,
  };
  const [results, setResults] = useState(intitialResultState);
  // Input
  const inputRef = useRef(null);
  // Typing + Submit handler
  let timer;
  function inputHandler(e) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // when typing end
      const inputValue = inputRef.current.value.replace(/\s/g, '').trim().toLowerCase();
      try {
        const result = complex(evaluate(inputValue));
        const degree = Math.floor(result.toPolar().phi * (180 / 3.14));
        const phiArg = result.toPolar().phi;
        const sqrtArg = result.re * result.re + result.im * result.im;
        const module = `√${sqrtArg} = ${parseFloat(result.toPolar().r).toFixed(2)}`;
        const trigForm = `√${sqrtArg}(cos(${degree}°) + isin(${degree}°)`;
        const resultString = `${(Math.cos(phiArg) * sqrtArg + Math.sin(phiArg) * sqrtArg).toFixed(3)}`;
        setResults({
          result: resultString,
          re: Math.round(result.re),
          im: result.im,
          conjugate: result.conjugate().format(),
          argument: `${degree}°`,
          module: module,
          trigonometricForm: trigForm,
        });
      } catch (error) {
        if (inputValue.length === 0) {
          setResults(intitialResultState);
        } else {
          setResults({ errorOccuried: true });
        }
      }
    }, 1000);
  }
  //CoordinateSystem
  // const canvasRef = useRef(null);
  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (canvas != null) {
  //     const amountOfNumbers = 7;
  //     canvas.width = 250;
  //     canvas.height = 250;
  //     const field = new MathCoordinateSystem(canvas, amountOfNumbers);
  //     field.drawMap();
  //     field.drawPoint(2, 2);
  //   }
  // }, [canvasRef]);
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
            ref={inputRef}
            onInput={inputHandler}
          ></ComplexNumberInput>
          {results.errorOccuried && <p className="error-message">Wrong expression, you need to write it correct!</p>}
          <ResultTable>
            <div>
              Wynik: <p>{results.result}</p>
            </div>
            <div>
              Sprzężenie: <p>{results.conjugate}</p>
            </div>
            <div>
              Moduł ∣Z∣: <p>{results.module}</p>
            </div>
            <div>
              Argument: <p>{results.argument}</p>
            </div>
            <div>
              Postać trygonometryczna: <p>{results.trigonometricForm}</p>
            </div>
            <div>
              Część rzeczywista - Re(z): <p>{results.re}</p>
            </div>
            <div>
              Część urojona - Im(z): <p>{results.im}</p>
            </div>
          </ResultTable>
          {/* <ComplexNumbersCoordinate ref={canvasRef}></ComplexNumbersCoordinate> */}
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default ComplexNumbers;
