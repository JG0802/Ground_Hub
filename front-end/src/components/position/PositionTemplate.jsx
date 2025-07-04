import styled from 'styled-components';
import PositionForm from './PositionForm';

const PageWrapper = styled.div`
  padding: 8vh 2vw 5vh;
  display: flex;
  justify-content: center;
  background-color: #f9f9f9;
`;

const Card = styled.div`
  width: 90%;
  max-width: 60vh;
  background-color: #fff;
  border-radius: 12px;
  padding: 3vh 3vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const StyledTitle = styled.h1`
  font-size: 2.4vh;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3vh;
`;

const PositionTemplate = () => {
  return (
    <PageWrapper>
      <Card>
        <StyledTitle>라인업 설정</StyledTitle>
        <PositionForm />
      </Card>
    </PageWrapper>
  );
};

export default PositionTemplate;
