import styled from 'styled-components';
import MyTeamForm from './MyTeamForm';

const MyTeamTemplateContainer = styled.div`
  text-align: center;
`;

const StyledTitle = styled.h1`
  margin-top: 3vh;
  margin-bottom: 1vh;
  font-size: 2.7vh;
`;

const MyTeamTemplate = () => {
  return (
    <MyTeamTemplateContainer>
      <StyledTitle>Team List</StyledTitle>
      <MyTeamForm />
    </MyTeamTemplateContainer>
  );
};

export default MyTeamTemplate;
