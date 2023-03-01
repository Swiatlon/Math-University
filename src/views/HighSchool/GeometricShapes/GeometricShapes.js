import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import { FieldsBoxesContainer } from './GeometricShapes.style';
import { FieldBox } from './GeometricShapes.style';
import { FieldTopic } from './GeometricShapes.style';
import square from 'assets/images/GeometricShapes/square.png';
import rectangle from 'assets/images/GeometricShapes/rectangle.png';
import triangle from 'assets/images/GeometricShapes/triangle.png';
import trapeze from 'assets/images/GeometricShapes/trapeze.png';
import parallelogram from 'assets/images/GeometricShapes/parallelogram.png';
import rhomb from 'assets/images/GeometricShapes/rhomb.png';
import circle from 'assets/images/GeometricShapes/circle.png';
import circleSector from 'assets/images/GeometricShapes/circleSector.png';
function GeometricShapes() {
  const elements = [
    { name: 'Kwadrat', url: square },
    { name: 'Prostokąt', url: rectangle },
    { name: 'Trójkat', url: triangle },
    { name: 'Trapez', url: trapeze },
    { name: 'Równoległobok', url: parallelogram },
    { name: 'Romb', url: rhomb },
    { name: 'Koło', url: circle },
    { name: 'Wycinek Koła', url: circleSector },
  ];
  return (
    <>
      <TopicTitle>Figury Geometryczne</TopicTitle>
      <TopicSubTitleContainer subTitle={'Opis tematu:'}>
        <TopicSubTitleContent>
          <p>
            Figury geometryczne to kształty, które możemy opisać za pomocą punktów, linii i płaszczyzn. Każda figura
            geometryczna ma swoje cechy charakterystyczne, takie jak liczba boków, kąty, promienie, długości i
            szerokości, które pozwalają na jej wyróżnienie i odróżnienie od innych figur.
          </p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle={'Przykładowe zadania:'}>
        <TopicSubTitleContent>
          <p>Cooming Soon!</p>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>

      <TopicSubTitleContainer subTitle="Kalkulator:">
        <TopicSubTitleContent>
          <FieldsBoxesContainer>
            {elements.map((box) => (
              <FieldBox key={box.name}>
                <FieldTopic>{box.name}</FieldTopic>
                <img src={box.url} alt={`${box.name}`}></img>
              </FieldBox>
            ))}
          </FieldsBoxesContainer>
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default GeometricShapes;
