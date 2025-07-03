import styled from 'styled-components';
import MyTeamForm from './MyTeamForm';

const Container = styled.div`
  width: 100%;
  padding: 7vh 2vw 3vh;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 50vh;
`;

const Title = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
`;

const MyTeamTemplate = () => {
  return (
    <Container>
      <ContentBox>
        <Title>My Teams</Title>
        <MyTeamForm />
      </ContentBox>
    </Container>
  );
};

export default MyTeamTemplate;
