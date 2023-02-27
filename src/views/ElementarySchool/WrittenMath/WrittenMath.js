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
    const numArray = [[...firstNum].map(Number), [...secondNum].map(Number)];
    let overfloow = [];
    let result = [];

    switch (symbol.current.value) {
      case '+':
        overfloow = Array(firstNum.length + 1).fill(0); // overflow need to be 1 size more
        for (let i = 1; i <= firstNum.length; i++) {
          const sumOfData =
            numArray[0][numArray[0].length - i] +
            (overfloow[overfloow.length - i] ?? 0) +
            (numArray[1][numArray[1].length - i] ?? 0);
          if (sumOfData >= 10) {
            overfloow[overfloow.length - i - 1] += 1;
            result.unshift(Number(sumOfData.toString()[1]));
          } else {
            result.unshift(sumOfData);
          }
        }
        if (overfloow[0] > 0) result.unshift(overfloow[0]);
        setCalculation({
          ...calucation,
          isSubmited: true,
          result: result.join(''),
          operation: 'summary',
          overfloow: overfloow.join(''),
        });
        break;
      case '-':
        overfloow = Array(firstNum.length + 1).fill(0); // overflow need to be 1 size more
        for (let i = 1; i <= firstNum.length; i++) {
          let sumOfData =
            numArray[0][numArray[0].length - i] +
            (overfloow[overfloow.length - i] ?? 0) -
            (numArray[1][numArray[1].length - i] ?? 0);
          if (sumOfData < 0) {
            numArray[0][numArray[1].length - i - 1] -= 1;
            overfloow[overfloow.length - i] += 10;
            sumOfData += overfloow[overfloow.length - i];
            result.unshift(Number(sumOfData));
            overfloow[overfloow.length - i] -= Math.abs(
              firstNum[firstNum.length - i] - Math.abs(numArray[0][numArray[0].length - i])
            );
          } else {
            result.unshift(sumOfData);
          }
        }
        if (overfloow[0] <= 0) overfloow.shift();
        while (result[0] <= 0) result.shift();
        setCalculation({
          ...calucation,
          isSubmited: true,
          result: result.join(''),
          operation: 'substraction',
          overfloow: overfloow.join(''),
        });
        break;
      case '/':
      case ':':
        console.log('dzielenie');
        break;
      case 'x':
      case 'X':
      case '*':
        if (firstNum * secondNum < 1_000_000) {
          for (let i = numArray[1].length - 1; i >= 0; i--) {
            const multiplicationResults = [];
            const multiplicationOverfloow = Array(firstNum.length).fill(0);
            for (let j = numArray[0].length - 1; j >= 0; j--) {
              const multiplication = (numArray[1][i] * numArray[0][j] + multiplicationOverfloow[j]).toString();
              if (j === 0) {
                multiplicationResults.unshift(Number(multiplication));
              } else {
                if (multiplication.length > 1) {
                  multiplicationOverfloow[j - 1] = Number(multiplication[0]);
                  multiplicationResults.unshift(Number(multiplication[1]));
                } else {
                  multiplicationResults.unshift(Number(multiplication));
                }
              }
            }
            overfloow.push(multiplicationOverfloow);
            result.push(multiplicationResults.join(''));
          }
          // Summ the results
          for (let i = 0; i < result.length; i++) {
            result[i] = result[i] + '0'.repeat(i);
          }
          setCalculation({
            ...calucation,
            isSubmited: true,
            result: result,
            operation: 'multiplying',
            overfloow: overfloow,
          });
        } else {
          setCalculation({
            ...calucation,
            errorOccuried: true,
            errorMessage: 'Wynik mnożenia musi byc mniejszy niż milion',
          });
        }
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
            <p className="number">{Math.max(numbers.firstNum, numbers.secondNum).toString()}</p>
            <p className="number lastNumber">+{Math.min(numbers.firstNum, numbers.secondNum).toString()}</p>
            <p className="result">{calucation.result}</p>
          </div>
        );
        break;
      case 'substraction':
        return (
          <div>
            <p className="overfloow">{calucation.overfloow}</p>
            <p className="number">{numbers.firstNum}</p>
            <p className="number lastNumber">-{numbers.secondNum}</p>
            <p className="result">{calucation.result}</p>
          </div>
        );
        break;
      case 'multiplying':
        return (
          <div>
            {calucation.overfloow.reverse().map((overflow) => (
              <p className="overfloow">{overflow}</p>
            ))}
            <p className="number">{numbers.firstNum}</p>
            <p className="number lastNumber">*{numbers.secondNum}</p>
            {calucation.result.map((result) => (
              <p className="subResult">{result}</p>
            ))}
            <p className="result subResultLast">{calucation.result.map(Number).reduce((a, b) => a + b, 0)}</p>
          </div>
        );
        break;
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
