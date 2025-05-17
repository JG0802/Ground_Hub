// src/components/home/FormationCarousel.js
import styled from 'styled-components';

const CarouselWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 2vh 0;
`;

const CarouselItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 2vh;
  padding: 3vh 2vh;
  margin: 0 2vh;
  text-align: center;
`;

const FormationImage = styled.img`
  width: 100%;
  max-width: 300px;
`;

const FormationText = styled.div`
  font-size: 2.2vh;
  font-weight: bold;
  margin-top: 1vh;
`;

const FormationCarousel = () => {
  return (
    <CarouselWrapper>
      <CarouselItem>
        <FormationText>
          미드필더 5명을 바탕으로 한<br />
          만능 포메이션 4-2-3-1
        </FormationText>
        <FormationImage
          src="/images/formation_4231.png"
          alt="포메이션 이미지"
        />
      </CarouselItem>
    </CarouselWrapper>
  );
};

export default FormationCarousel;
