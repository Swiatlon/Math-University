import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/atoms/TopicSubTitleContainer/TopicSubTitleContainer';
import Logo from 'assets/images/Logo.png';

function ComplexNumbers() {
  return (
    <>
      <TopicTitle>Liczby Zespolone</TopicTitle>
      <TopicSubTitleContainer subTitle={'Opis tematu:'}>
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych.Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Wytłumaczenie tematu:">
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych.Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
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
        <TopicSubTitleContent>
          <p>
            Liczby które są rozszerzeniem liczb rzeczywistych.Główne zastosowanie: automatyka, robotyka, optyka,
            telekomunikacja, chemia czy też medycyna.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default ComplexNumbers;
