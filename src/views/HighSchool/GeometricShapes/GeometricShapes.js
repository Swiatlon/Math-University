import React from 'react';
import { TopicTitle } from 'components/atoms/TopicTitle/TopicTitle.style';
import { TopicSubTitleContent } from 'components/atoms/TopicSubTitleContent/TopicSubTitleContent.style';
import TopicSubTitleContainer from 'components/molecules/TopicSubTitleContainer/TopicSubTitleContainer';
import { FieldsBoxesContainer } from './GeometricShapes.style';
import { FieldBox } from './GeometricShapes.style';
import { FieldTopic } from './GeometricShapes.style';
import squareImg from 'assets/images/GeometricShapes/square.png';
import rectangleImg from 'assets/images/GeometricShapes/rectangle.png';
import triangleImg from 'assets/images/GeometricShapes/triangle.png';
import parallelogramImg from 'assets/images/GeometricShapes/parallelogram.png';
import rhombImg from 'assets/images/GeometricShapes/rhomb.png';
import circleImg from 'assets/images/GeometricShapes/circle.png';
import circleSectorImg from 'assets/images/GeometricShapes/circleSector.png';
import { useState } from 'react';
import Square from 'components/organisms/Square/Square';
import Rectangle from 'components/organisms/Rectangle/Rectangle';
import Triangle from 'components/organisms/Triangle/Triangle';
import Parallelogram from 'components/organisms/Parallelogram/Parallelogram';
import Rhomb from 'components/organisms/Rhomb/Rhomb';
import Circle from 'components/organisms/Circle/Circle';
import CircleSector from 'components/organisms/CircleSector/CircleSector';
function GeometricShapes() {
  const [choosedShape, setChoosedShape] = useState(null);
  // Szesciokat // Osmiokat // WIELOKAT SUMA KATOW ITD // DELTOID
  const elements = [
    { name: 'Kwadrat', url: squareImg },
    { name: 'Prostokąt', url: rectangleImg },
    { name: 'Trójkąt', url: triangleImg },
    { name: 'Równoległobok', url: parallelogramImg },
    { name: 'Wycinek Koła', url: circleSectorImg },
    { name: 'Koło', url: circleImg },
    { name: 'Romb', url: rhombImg },
  ];

  const shapes = () => {
    switch (choosedShape) {
      case 'Kwadrat':
        return <Square />;
      case 'Prostokąt':
        return <Rectangle />;
      case 'Trójkąt':
        return <Triangle />;
      case 'Równoległobok':
        return <Parallelogram />;
      case 'Romb':
        return <Rhomb />;
      case 'Koło':
        return <Circle />;
      case 'Wycinek Koła':
        return <CircleSector />;
      default:
        return <></>;
    }
  };

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
              <FieldBox
                key={box.name}
                elemPerRow={3}
                onClick={() => {
                  setChoosedShape(box.name);
                }}
              >
                <FieldTopic>{box.name}</FieldTopic>
                <img src={box.url} alt={`${box.name}`}></img>
              </FieldBox>
            ))}
          </FieldsBoxesContainer>
          {choosedShape !== null ? shapes() : ''}
        </TopicSubTitleContent>
      </TopicSubTitleContainer>
    </>
  );
}

export default GeometricShapes;
