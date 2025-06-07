import { useState } from 'react';
import styled from 'styled-components';
import formations from '../../data/formation.json';
import { useNavigate } from 'react-router-dom';

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2vh;
  position: relative;
  text-align: center;
`;

const CarouselItem = styled.div`
  background-color: #eee;
  border-radius: 2vh;
  padding: 2vh;
  max-width: 430px;
  margin: auto;
  cursor: pointer;
`;

const FormationImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 1vh;
`;

const FormationText = styled.div`
  font-size: 2.2vh;
  font-weight: bold;
  margin-top: 1vh;
`;

const FormationTitle = styled.div`
  font-size: 3vh;
  font-weight: bold;
  margin-top: 1vh;
  margin-bottom: 1vh;
`;

const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.7);
  border: none;
  font-size: 5vh;
  cursor: pointer;
  z-index: 1;
  background-color: #eee;
  &:hover {
    color: rgba(150, 150, 150, 0.7);
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 1vh;
`;

const RightArrow = styled(ArrowButton)`
  right: 1vh;
`;

const FormationCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * formations.length),
  );
  const navigate = useNavigate();

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? formations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === formations.length - 1 ? 0 : prev + 1));
  };

  const handleMove = () => {
    navigate(`/detail/formation/${formations[currentIndex].id}`); // id 기준 이동
  };

  const currentFormation = formations[currentIndex];

  return (
    <CarouselWrapper>
      <LeftArrow onClick={handlePrev}>«</LeftArrow>
      <CarouselItem key={currentFormation.id} onClick={handleMove}>
        <FormationText>{currentFormation.summation}</FormationText>
        <FormationTitle>{currentFormation.title}</FormationTitle>
        <FormationImage
          src={currentFormation.img}
          alt={currentFormation.title}
        />
      </CarouselItem>
      <RightArrow onClick={handleNext}>»</RightArrow>
    </CarouselWrapper>
  );
};

export default FormationCarousel;
