import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h2`
  font-family: 'MarinesBold', sans-serif;
  font-size: 20px;
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const ProfilePage = () => {
  return (
    <Container>
      <Title>김웅빈</Title>
      <InfoBox>20대 남성 🇰🇷 대한민국</InfoBox>
      <InfoBox>나의 축구 레벨: 세미프로 75</InfoBox>
      {/* 여기에 레이더 차트, 기록 등 추가 예정 */}
    </Container>
  );
};

export default ProfilePage;
