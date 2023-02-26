import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import { WrittenMathInput } from './WrittenMath.style';
import { WrittenMathInputsContainer } from './WrittenMath.style';
import overview from 'assets/images/writtenMath.jpg';
import { useRef, useState } from 'react';
import { SummaryContainer } from './WrittenMath.style';
function WrittenMath() {
  console.log('rerender');
  const initialState = {
    isSubmited: false,
    result: null,
    operation: null,
    overfloow: null,
    errorOccuried: false,
    errorMessage: false,
  };

  const numInitalState = {
    firstNum: '',
    secondNum: '',
  };

  const [calucation, setCalculation] = useState(initialState);
  const [numbers, setNumbers] = useState(numInitalState);
  const symbol = useRef(null);

  const symbolHandler = () => {
    const regExp = /\+|-|\/|:|x|X|\*/g;
    let isCorrect = regExp.test(symbol.current.value.toString());
    if (!isCorrect) {
      symbol.current.value = symbol.current.value.slice(0, -1);
    }
  };
  const numbersHandler = (e) => {
    const regExp = /\D/g;
    if (!regExp.test(e.value)) {
      setNumbers({ ...numbers, [e.name]: e.value });
    }
    setCalculation(initialState);
  };

  const submitHandler = () => {
    const firstNum = Math.max(numbers.firstNum, numbers.secondNum).toString();
    const secondNum = Math.min(numbers.firstNum, numbers.secondNum).toString();
    const MathArray = [Array(firstNum.length + 1).fill(0), [...firstNum].map(Number), [...secondNum].map(Number), []]; // 0 - overflow 1-first number  2-second number 3-Result
    while (MathArray[1].length !== MathArray[0].length) MathArray[1].unshift(0);
    while (MathArray[2].length !== MathArray[0].length) MathArray[2].unshift(0);
    switch (symbol.current.value) {
      case '+':
        for (let i = firstNum.length; i >= 0; i--) {
          const sumNumbers = (MathArray[0][i] ?? 0) + (MathArray[1][i] ?? 0) + (MathArray[2][i] ?? 0);
          if (sumNumbers >= 10) {
            MathArray[0][i - 1] += 1;
            MathArray[3].unshift(Number(sumNumbers.toString()[1]));
          } else {
            MathArray[3].unshift(sumNumbers);
          }
        }
        if (MathArray[0][0] === 0) MathArray[0].shift();
        if (MathArray[3][0] === 0) MathArray[3].shift();
        setCalculation({
          ...calucation,
          isSubmited: true,
          result: MathArray[3].join(''),
          operation: 'summary',
          overfloow: MathArray[0].join(''),
        });
        break;
      case '-':
        if (Number(numbers.firstNum) >= Number(numbers.secondNum)) {
          for (let i = firstNum.length; i >= 0; i--) {
            let sumNumbers = (MathArray[0][i] ?? 0) + (MathArray[1][i] ?? 0) - (MathArray[2][i] ?? 0);
            while (sumNumbers < 0) {
              if (sumNumbers < 0) {
                MathArray[1][i - 1] -= 1; // left position from number we substract
                MathArray[0][i] = 10;
              }
              sumNumbers = (MathArray[0][i] ?? 0) + (MathArray[1][i] ?? 0) - (MathArray[2][i] ?? 0);
            }
            MathArray[0][i] -= MathArray[0][i] > 0 ? Math.abs((firstNum[i - 1] ?? 0) - MathArray[1][i]) : 0;
            MathArray[3].unshift(sumNumbers);
          }
          if (MathArray[0][0] === 0) MathArray[0].shift();
          while (MathArray[3][0] <= 0) MathArray[3].shift();
          setCalculation({
            ...calucation,
            isSubmited: true,
            result: MathArray[3].join(''),
            operation: 'substraction',
            overfloow: MathArray[0].join(''),
          });
        } else {
          setCalculation({ ...calucation, errorOccuried: true, errorMessage: 'Pierwsza liczba musi być większa!' });
        }
        break;
      case '/':
      case ':':
        console.log('dzielenie');
        break;
      case 'x':
      case 'X':
      case '*':
        console.log('mnozenie');
        break;
      default:
        console.log('different');
        break;
    }
  };
  // Content depend of calculation
  const Summary = () => {
    switch (calucation.operation) {
      case 'summary':
        return (
          <div>
            <p className="overfloow">{calucation.overfloow}</p>
            <p>{Math.max(numbers.firstNum, numbers.secondNum).toString()}</p>
            <p>+{Math.min(numbers.firstNum, numbers.secondNum).toString()}</p>
            <p>{calucation.result}</p>
          </div>
        );
        break;
      case 'substraction':
        return (
          <div>
            <p>{calucation.overfloow}</p>
            <p>{numbers.firstNum}</p>
            <p>-{numbers.secondNum}</p>
            <p>{calucation.result}</p>
          </div>
        );
      default:
        <></>;
        break;
    }
  };
  return (
    <>
      <TopicTitle>Działania Pisemne</TopicTitle>
      <TopicSubTitleContainer subTitle={'Opis tematu:'}>
        <TopicSubTitleContent>
          <p>
            Działania pisemne służą nam do prostszego oraz szybszego obliczania działań matematycznych w momencie, kiedy
            nie możemy skorzystać z kalkulatora.
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
          <WrittenMathInputsContainer>
            <WrittenMathInput
              type="text"
              placeholder="pierwsza liczba"
              maxLength={7}
              minLength={1}
              value={numbers.firstNum}
              name="firstNum"
              onInput={(e) => {
                numbersHandler(e.target);
              }}
            ></WrittenMathInput>
            <WrittenMathInput
              ref={symbol}
              pattern="\+|-|/|:|x|\*/"
              onInput={symbolHandler}
              maxLength={1}
              minLength={1}
              placeholder="symbol"
            ></WrittenMathInput>
            <WrittenMathInput
              type="text"
              placeholder="druga liczba"
              maxLength={7}
              minLength={1}
              value={numbers.secondNum}
              name="secondNum"
              onInput={(e) => {
                numbersHandler(e.target);
              }}
            ></WrittenMathInput>
            <WrittenMathInput value="Pokaż rozwiązanie" type="submit" onClick={submitHandler}></WrittenMathInput>
          </WrittenMathInputsContainer>
          {calucation.errorOccuried && <p className="error-message">{calucation.errorMessage}</p>}
          <SummaryContainer>{calucation.isSubmited ? <Summary></Summary> : ''}</SummaryContainer>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default WrittenMath;
