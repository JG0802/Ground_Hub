import { useParams } from 'react-router-dom';
import formations from '../data/formation.json';
import styled from 'styled-components';

const Container = styled.div`
  padding: 7vh 2vw 5vh;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 60vh;
  background-color: #fff;
  border-radius: 12px;
  padding: 3vh 3vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  font-size: 2.4vh;
  font-weight: 700;
  margin-bottom: 1.5vh;
  text-align: center;
`;

const Summary = styled.p`
  font-size: 1.7vh;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin-bottom: 2vh;
`;

const Description = styled.p`
  font-size: 1.6vh;
  color: #555;
  line-height: 1.6;
  margin-bottom: 2vh;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 1vh;
  margin-bottom: 2vh;
`;

const FormationDetailPage = () => {
  const { id } = useParams();
  const data = formations[id];

  if (!data) {
    return (
      <Container>
        <Card>
          <Description>포메이션 정보를 찾을 수 없습니다.</Description>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>{data.title}</Title>
        <Summary>{data.summation}</Summary>
        <Description>{data.description1}</Description>
        <Image src={data.img} alt={data.title} />
        <Description>{data.description2}</Description>
      </Card>
    </Container>
  );
};

export default FormationDetailPage;
