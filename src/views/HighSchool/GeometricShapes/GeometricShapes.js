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
import trapezeImg from 'assets/images/GeometricShapes/trapeze.png';
import parallelogramImg from 'assets/images/GeometricShapes/parallelogram.png';
import rhombImg from 'assets/images/GeometricShapes/rhomb.png';
import circleImg from 'assets/images/GeometricShapes/circle.png';
import circleSectorImg from 'assets/images/GeometricShapes/circleSector.png';
import { useState } from 'react';
import Square from 'components/molecules/Square/Square';
import Rectangle from 'components/molecules/Rectangle/Rectangle';
import Triangle from 'components/molecules/Triangle/Triangle';
import Trapeze from 'components/molecules/Trapeze/Trapeze';
import Parallelogram from 'components/molecules/Parallelogram/Parallelogram';
import Rhomb from 'components/molecules/Rhomb/Rhomb';
import Circle from 'components/molecules/Circle/Circle';
import CircleSector from 'components/molecules/CircleSector/CircleSector';
function GeometricShapes() {
  const [choosedShape, setChoosedShape] = useState(null);
  // Szesciokat // Osmiokat // WIELOKAT SUMA KATOW ITD // DELTOID
  const elements = [
    { name: 'Kwadrat', url: squareImg },
    { name: 'Prostokąt', url: rectangleImg },
    { name: 'Trójkat', url: triangleImg },
    { name: 'Trapez', url: trapezeImg },
    { name: 'Równoległobok', url: parallelogramImg },
    { name: 'Romb', url: rhombImg },
    { name: 'Koło', url: circleImg },
    { name: 'Wycinek Koła', url: circleSectorImg },
  ];

  const shapes = () => {
    switch (choosedShape) {
      case 'Kwadrat':
        return <Square />;
      case 'Prostokąt':
        return <Rectangle />;
      case 'Trójkąt':
        return <Triangle />;
      case 'Trapez':
        return <Trapeze />;
      case 'Rownoległobok':
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
