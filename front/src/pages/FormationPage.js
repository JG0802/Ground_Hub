import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import formations from '../data/formation.json';

const PageWrapper = styled.div`
  padding: 7vh 2vw 3vh;
  background-color: #f9f9f9;
`;

const PageTitle = styled.h1`
  font-size: 2.4vh;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3vh;
`;

const FormationCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2vh;
  margin-bottom: 3vh;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const FormationText = styled.p`
  font-size: 1.5vh;
  color: #555;
  margin: 0 0 0.5vh;
`;

const FormationTitle = styled.h3`
  font-size: 1.8vh;
  font-weight: bold;
  margin: 0 0 1vh;
`;

const FormationImage = styled.img`
  width: 100%;
  border-radius: 1vh;
  object-fit: cover;
`;

const FormationPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <PageTitle>Formation Lib.</PageTitle>
      {formations.map((form) => (
        <FormationCard
          key={form.id}
          onClick={() => navigate(`/formation/${form.id}`)}
        >
          <FormationText>{form.summation}</FormationText>
          <FormationTitle>{form.title}</FormationTitle>
          <FormationImage src={form.img} alt={form.title} />
        </FormationCard>
      ))}
    </PageWrapper>
  );
};

export default FormationPage;
