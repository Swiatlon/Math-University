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
  };
  const [calucation, setCalculation] = useState(initialState);
  const firstNumInput = useRef(null);
  const secondNumInput = useRef(null);
  const symbol = useRef(null);

  const symbolHandler = () => {
    const regExp = /\+|-|\/|:|x|X|\*/g;
    let isCorrect = regExp.test(symbol.current.value.toString());
    if (!isCorrect) {
      symbol.current.value = symbol.current.value.slice(0, -1);
    }
  };
  const numbersHandler = (input) => {
    if (input.current.value.length > 7) {
      input.current.value = input.current.value.slice(0, 7);
    }
  };
  const submitHandler = () => {
    const firstNum = Math.max(firstNumInput.current.value, secondNumInput.current.value).toString();
    const secondNum = Math.min(firstNumInput.current.value, secondNumInput.current.value).toString();
    const YArray = [Array(firstNum.length + 1).fill(0), [...firstNum].map(Number), [...secondNum].map(Number), []]; // 0 - overflow 1-first number  2-second number 3-Result
    switch (symbol.current.value) {
      case '+':
        while (YArray[1].length !== YArray[0].length) YArray[1].unshift(0);
        while (YArray[2].length !== YArray[0].length) YArray[2].unshift(0);
        for (let i = firstNum.length; i >= 0; i--) {
          const sumNumbers = (YArray[0][i] ?? 0) + (YArray[1][i] ?? 0) + (YArray[2][i] ?? 0);
          if (sumNumbers >= 10) {
            YArray[0][i - 1] += 1;
            YArray[3].unshift(Number(sumNumbers.toString()[1]));
          } else {
            YArray[3].unshift(sumNumbers);
          }
        }
        if (YArray[0][0] === 0) YArray[0].shift();
        if (YArray[3][0] === 0) YArray[3].shift();
        setCalculation({
          isSubmited: true,
          result: YArray[3].join(''),
          operation: 'summary',
          overfloow: YArray[0].join(''),
        });
        break;
      case '-':
        console.log('minus');
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
              ref={firstNumInput}
              type="number"
              placeholder="pierwsza liczba"
              maxLength={7}
              minLength={1}
              onInput={() => {
                numbersHandler(firstNumInput);
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
              ref={secondNumInput}
              type="number"
              placeholder="druga liczba"
              maxLength={7}
              minLength={1}
              onInput={() => {
                numbersHandler(secondNumInput);
              }}
            ></WrittenMathInput>
            <WrittenMathInput value="Pokaż rozwiązanie" type="submit" onClick={submitHandler}></WrittenMathInput>
          </WrittenMathInputsContainer>
          <SummaryContainer>
            {calucation.isSubmited ? (
              <>
                <p>{calucation.overfloow}</p>
                <p>{Math.max(firstNumInput.current.value, secondNumInput.current.value).toString()}</p>
                <p>+{Math.min(firstNumInput.current.value, secondNumInput.current.value).toString()}</p>
                <p>{calucation.result}</p>
              </>
            ) : (
              ''
            )}
          </SummaryContainer>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default WrittenMath;
