import styled from 'styled-components';
import PositionForm from './PositionForm';

const PositionTemplateContainer = styled.div`
  text-align: center;
`;

const StyledTitle = styled.h1`
  margin-top: 3vh;
  margin-bottom: 1vh;
  font-size: 2.7vh;
`;

const PositionTemplate = () => {
  return (
    <PositionTemplateContainer>
      <StyledTitle>라인업 설정</StyledTitle>
      <PositionForm />
    </PositionTemplateContainer>
  );
};

export default PositionTemplate;
